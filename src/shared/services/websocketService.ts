import { WS_API_KEY, WS_API_SECRET, WS_BASE_URL } from "../constants/config";

export type MessageType =
  | "CONNECTED"
  | "SUBSCRIBE"
  | "PRICE_UPDATE"
  | "ORDER_UPDATE"
  | "ORDER_BOOK_UPDATE"
  | "MARKET_EVENT"
  | "PLACE_ORDER"
  | "ORDER_ACK"
  | "ORDER_REJECTED";

export interface Envelope<T = any> {
  type: MessageType;
  payload: T;
}

export interface PriceUpdatePayload {
  ticker: string;
  price: number;
  change: number;
  change_pct: number;
  volume: number;
  market_time: string;
}

export interface MarketEventPayload {
  event_id: string;
  event_type: string;
  is_open?: boolean;
  headline: string;
  scope: string;
  target: string;
  magnitude: number;
  duration_ticks: number;
  market_time: string;
}

export type MessageHandler<T = any> = (payload: T) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private handlers: Map<MessageType, Set<MessageHandler>> = new Map();
  private reconnectTimeout: number | null = null;
  private authenticated = false;
  private priceFeedTickers: Set<string> = new Set();

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.reconnectTimeout) {
      window.clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      this.socket.close();
    }

    const apiKey = WS_API_KEY;
    const apiSecret = WS_API_SECRET;
    const url = `${WS_BASE_URL}/ws?api_key=${apiKey}&api_secret=${apiSecret}`;

    console.log(`Connecting to WebSocket: ${url}`);
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.authenticated = false;
    };

    this.socket.onmessage = (event) => {
      try {
        const envelope: Envelope = JSON.parse(event.data);
        console.log(`WebSocket received: ${envelope.type}`, envelope.payload);

        if (envelope.type === "CONNECTED") {
          this.authenticated = true;
          this.onAuthenticated();
        }

        const handlers = this.handlers.get(envelope.type);
        if (handlers) {
          handlers.forEach((handler) => handler(envelope.payload));
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting in 5s...");
      this.authenticated = false;
      this.reconnectTimeout = window.setTimeout(() => this.connect(), 5000);
    };

    this.socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }

  private onAuthenticated() {
    this.subscribe("MARKET_EVENTS");
    if (this.priceFeedTickers.size > 0) {
      this.sendSubscribe("PRICE_FEED", [...this.priceFeedTickers]);
    }
  }

  private sendSubscribe(channel: string, tickers?: string[], ticker?: string) {
    const payload: Record<string, unknown> = { channel };
    if (tickers) payload.tickers = tickers;
    if (ticker) payload.ticker = ticker;
    this.socket!.send(JSON.stringify({ type: "SUBSCRIBE", payload }));
    console.log(`WebSocket subscribed to ${channel}`, payload);
  }

  public subscribe(channel: string, tickers?: string[], ticker?: string) {
    if (channel === "PRICE_FEED" && tickers) {
      tickers.forEach(t => this.priceFeedTickers.add(t));
    }

    if (!this.socket || this.socket.readyState !== WebSocket.OPEN || !this.authenticated) {
      setTimeout(() => this.subscribe(channel, tickers, ticker), 1000);
      return;
    }

    this.sendSubscribe(channel, tickers, ticker);
  }

  public on<T>(type: MessageType, handler: MessageHandler<T>) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);
    return () => this.off(type, handler);
  }

  public off<T>(type: MessageType, handler: MessageHandler<T>) {
    const handlers = this.handlers.get(type);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

export const websocketService = new WebSocketService();
