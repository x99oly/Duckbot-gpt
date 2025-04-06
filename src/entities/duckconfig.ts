import { IConfig } from "../interfaces/iconfig"

export default class BotConfig {
    private _purpose: string
    private _playfulness: number
    private _cohesion: number
    private _redundance: number
    private _max_tokens: number

    constructor(purpose: string) {
        this._purpose = purpose
        this._playfulness = 0.8 // o quão viajar ele pode
        this._cohesion = 0.8 // Só palavras com 80% de chances de fazerem sentido no contexto
        this._redundance = 1.0 // -2 a 2 => Quão maior menor é a repetição de palavras
        this._max_tokens = 1500
    }

    setConfig(config:IConfig) {
        this._purpose = config.purpose ?? this._purpose
        this._playfulness = this.setPercent(config.playfulness)
        this._cohesion = this.setPercent(config.cohesion)
        this._redundance = this.setRedundance(config.redundance)
        this._max_tokens = this.setTokens(config.max_tokens)
    }

    private setTokens(n?:number) {
        if (!n || n <= 0) return 1500
        return Math.floor(n)
    }

    private setPercent(n?:number):number {
        if (!n) return 0.8
        if (n > 10) return 1
        if (n <= 0) return 0.1
        return n/10
    }

    private setRedundance(n?:number):number {
        if (!n || n < -2 || n > 2) return 1
        return Math.floor(n)
    }

    get purpose() {
        return this._purpose
    }

    get playfulness() {
        return this._playfulness
    }

    get cohesion() {
        return this._cohesion
    }

    get redundance() {
        return this._redundance
    }

    get max_tokens() {
        return this._max_tokens
    }
}
