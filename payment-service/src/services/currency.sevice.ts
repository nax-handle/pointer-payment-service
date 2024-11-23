import { BadRequest } from "../helpers/error.helper";
import { Currency, ICurrency } from "../models/currency.model";

export default class CurrencyService {
  static async getCurrencyByName(symbol: string): Promise<ICurrency> {
    const currency = await Currency.findOne({ symbol });
    if (!currency) {
      throw new BadRequest("Currency not found!");
    }
    return currency;
  }
}
