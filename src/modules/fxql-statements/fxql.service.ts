import { Injectable } from "@nestjs/common";
import { IFxQl } from "./type";
import { ResponseUtilsService } from "src/shared/utils";

@Injectable()
export class FxQlServices {

    constructor(
        public readonly response: ResponseUtilsService
    ) { }

    async fxqlStatements(payload: IFxQl) {
        let { FXQL } = payload


        const currencyMap = new Map(); // Map to track unique currency pairs
        FXQL = FXQL.replace(/\\n/g, '\n');

        // map to track unique pairs
        // Use a regex to match individual FXQL blocks
        const pairs = FXQL.match(/(\w+-\w+)\s*{\s*BUY\s*([\d.]+)\s*SELL\s*([\d.]+)\s*CAP\s*(\d+)\s*}/g);
        console.log("=== pairs -===")
        console.log(pairs)
        console.log("=== pairs -===")

        const blockRegex = /(\w+)-(\w+)\s*{\s*BUY\s*([\d.]+)\s*SELL\s*([\d.]+)\s*CAP\s*(\d+)\s*}/g;

        let match;
        let entryId = 0;

        // Use exec() to extract each block in a loop
        while ((match = blockRegex.exec(FXQL)) !== null) {
            const [fullMatch, sourceCurrency, destinationCurrency, buy, sell, cap] = match;
            console.log("===== matched pair ====")
            console.log(fullMatch, sourceCurrency, destinationCurrency, buy, sell, cap)
            console.log("===== matched pair ====")

            this.validateFXQLBlock({
                FXQL,
                sourceCurrency,
                destinationCurrency,
                buy,
                sell,
                cap
            });

            // Increment entryId
            entryId++;

            // Construct the entry for the current pair
            const currencyKey = `${sourceCurrency}-${destinationCurrency}`;

            // Store the latest FXQL block for each unique currency pair
            currencyMap.set(currencyKey, {
                EntryId: entryId,
                SourceCurrency: sourceCurrency,
                DestinationCurrency: destinationCurrency,
                SellPrice: parseFloat(sell),
                BuyPrice: parseFloat(buy),
                CapAmount: parseInt(cap, 10),
            });
        }

        const data = Array.from(currencyMap.values());



        return this.response.success200Response({
            message: 'Rates Parsed Successfully.',
            data
        });
    }

    validateFXQLBlock(payload: {
        sourceCurrency: string;
        destinationCurrency: string;
        buy: number;
        sell: number;
        cap: number;
        FXQL: string
    }) {
        const { sourceCurrency, destinationCurrency, buy, sell, cap, FXQL } = payload

        if (sourceCurrency.toUpperCase() !== sourceCurrency) {
            throw new Error(`Invalid: '${sourceCurrency}' should be in uppercase`)
        }

        if (destinationCurrency.toUpperCase() !== destinationCurrency) {
            throw new Error(`Invalid: '${destinationCurrency}' should be in uppercase`);
        }

        const pairRegex = new RegExp(`${sourceCurrency}-${destinationCurrency}\\s*{`);
        if (!pairRegex.test(FXQL)) {
            throw new Error(`Invalid: Missing single space after currency pair '${sourceCurrency}-${destinationCurrency}'`);
        }

        if (isNaN(buy) || isNaN(sell)) {
            throw new Error(`Invalid: 'BUY' or 'SELL' amount should be a valid number for '${sourceCurrency}-${destinationCurrency}'`);
        }

        if (cap < 0) {
            throw new Error(`Invalid: 'CAP' cannot be a negative number for '${sourceCurrency}-${destinationCurrency}'`);
        }

        if (!buy || !sell || !cap) {
            throw new Error(`Invalid: Empty or incomplete FXQL statement for '${sourceCurrency}-${destinationCurrency}'`);
        }
    };


}