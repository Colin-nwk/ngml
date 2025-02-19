// interface NNPCData {
//     date: string;
//     'Total Consumption': number;
// }

// interface LineGraphData {
//     date: string;
//     'Direct Consumption': number;
//     'UJV Consumption': number;
//     'Daily Volume Target': number;
// }

// /**
//  * Generates sequential dates from 1 to 31
//  * @returns Array of date strings from "1" to "31"
//  */
// const generateDatesForMonth = (): string[] => {
//     return Array.from({ length: 31 }, (_, i) => String(i + 1));
// };

// /**
//  * Generates sample NNPC consumption data
//  * @param timeframe 'daily' | 'monthly' - Whether to generate daily or monthly data
//  * @param months Number of months to generate data for (default: 12)
//  * @param baseConsumption Base consumption value to calculate around (default: 250)
//  * @param variance Maximum random variance from base consumption (default: 100)
//  */
// export const generateNNPCData = (
//     timeframe: 'daily' | 'monthly' = 'monthly',
//     months: number = 12,
//     baseConsumption: number = 250,
//     variance: number = 100
// ): NNPCData[] => {
//     if (timeframe === 'monthly') {
//         const monthNames = [
//             'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//         ];
        
//         return Array.from({ length: months }, (_, i) => ({
//             date: monthNames[i % 12],
//             'Total Consumption': Math.floor(
//                 baseConsumption + (Math.random() * 2 - 1) * variance
//             )
//         }));
//     } else {
//         // Generate daily data (1-31 for each month)
//         const result: NNPCData[] = [];
//         const dates = generateDatesForMonth();
        
//         for (let month = 0; month < months; month++) {
//             dates.forEach(date => {
//                 result.push({
//                     date,
//                     'Total Consumption': Math.floor(
//                         baseConsumption + (Math.random() * 2 - 1) * variance
//                     )
//                 });
//             });
//         }
        
//         return result;
//     }
// };

// /**
//  * Generates sample line graph data with Direct Consumption, UJV Consumption, and Daily Volume Target
//  * @param timeframe 'daily' | 'monthly' - Whether to generate daily or monthly data
//  * @param months Number of months to generate data for (default: 12)
//  * @param targetVolume Fixed daily volume target (default: 130)
//  * @param baseConsumption Base consumption value for both Direct and UJV (default: 130)
//  * @param variance Maximum random variance from base consumption (default: 40)
//  */
// export const generateLineGraphData = (
//     timeframe: 'daily' | 'monthly' = 'monthly',
//     months: number = 12,
//     targetVolume: number = 130,
//     baseConsumption: number = 130,
//     variance: number = 40
// ): LineGraphData[] => {
//     if (timeframe === 'monthly') {
//         const monthNames = [
//             'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//         ];
        
//         return Array.from({ length: months }, (_, i) => ({
//             date: monthNames[i % 12],
//             'Direct Consumption': Math.floor(
//                 baseConsumption + (Math.random() * 2 - 1) * variance
//             ),
//             'UJV Consumption': Math.floor(
//                 baseConsumption + (Math.random() * 2 - 1) * variance
//             ),
//             'Daily Volume Target': targetVolume
//         }));
//     } else {
//         // Generate daily data (1-31 for each month)
//         const result: LineGraphData[] = [];
//         const dates = generateDatesForMonth();
        
//         for (let month = 0; month < months; month++) {
//             dates.forEach(date => {
//                 result.push({
//                     date,
//                     'Direct Consumption': Math.floor(
//                         baseConsumption + (Math.random() * 2 - 1) * variance
//                     ),
//                     'UJV Consumption': Math.floor(
//                         baseConsumption + (Math.random() * 2 - 1) * variance
//                     ),
//                     'Daily Volume Target': targetVolume
//                 });
//             });
//         }
        
//         return result;
//     }
// };

interface NNPCData {
    date: string;
    'Total Consumption': number;
}

interface LineGraphData {
    date: string;
    'Direct Consumption': number;
    'UJV/BOT Consumption': number;
    // 'Daily Volume Target'?: number;
}

/**
 * Generates dates for a given month and year
 * @param year Year to generate dates for
 * @param month Month to generate dates for (0-11)
 * @returns Array of date strings representing days of the month
 */
const generateDatesForMonth = (year: number, month: number): string[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => String(i + 1));
};

/**
 * Generates sample NNPC consumption data
 * @param timeframe 'daily' | 'monthly' - Whether to generate daily or monthly data
 * @param baseConsumption Base consumption value to calculate around (default: 250)
 * @param variance Maximum random variance from base consumption (default: 100)
 * @param startDate Optional start date for daily data (default: current date)
 */
export const generateNNPCData = (
    timeframe: 'daily' | 'monthly' = 'monthly',
    baseConsumption: number = 250,
    variance: number = 100,
    startDate: Date = new Date()
): NNPCData[] => {
    if (timeframe === 'monthly') {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        return Array.from({ length: 12 }, (_, i) => ({
            date: monthNames[i],
            'Total Consumption': Math.floor(
                baseConsumption + (Math.random() * 2 - 1) * variance
            )
        }));
    } else {
        // Generate daily data for current month only
        const currentDate = new Date(startDate);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const dates = generateDatesForMonth(year, month);
        
        return dates.map(date => ({
            date,
            'Total Consumption': Math.floor(
                baseConsumption + (Math.random() * 2 - 1) * variance
            )
        }));
    }
};

/**
 * Generates sample line graph data with Direct Consumption, UJV Consumption, and Daily Volume Target
 * @param timeframe 'daily' | 'monthly' - Whether to generate daily or monthly data
 * @param targetVolume Fixed daily volume target (default: 130)
 * @param baseConsumption Base consumption value for both Direct and UJV (default: 130)
 * @param variance Maximum random variance from base consumption (default: 40)
 * @param startDate Optional start date for daily data (default: current date)
 */
export const generateLineGraphData = (
    timeframe: 'daily' | 'monthly' = 'monthly',
    targetVolume: number = 310,
    baseConsumption: number = 130,
    variance: number = 40,
    startDate: Date = new Date()
): LineGraphData[] => {
    if (timeframe === 'monthly') {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        return Array.from({ length: 12 }, (_, i) => ({
            date: monthNames[i],
            'Direct Consumption': Math.floor(
                baseConsumption + (Math.random() * 2 - 1) * variance
            ),
            'UJV/BOT Consumption': Math.floor(
                baseConsumption + (Math.random() * 2 - 1) * variance
            ),
            'Volume Target': targetVolume
        }));
    } else {
        // Generate daily data for current month only
        const currentDate = new Date(startDate);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const dates = generateDatesForMonth(year, month);
        
        return dates.map(date => ({
            date,
            'Direct Consumption': Math.floor(
                baseConsumption + (Math.random() * 2 - 1) * variance
            ),
            'UJV/BOT Consumption': Math.floor(
                baseConsumption + (Math.random() * 2 - 1) * variance
            ),
            'Volume Target': targetVolume
        }));
    }
};

// Example usage:
// Monthly data
// const monthlyData = generateNNPCData('monthly', 12, 250, 100);
// const monthlyLineData = generateLineGraphData('monthly', 12, 130, 130, 40);

// // Daily data for the last 3 months
// const dailyData = generateNNPCData('daily', 3, 250, 100, new Date());
// const dailyLineData = generateLineGraphData('daily', 3, 130, 130, 40, new Date());
// interface NNPCData {
//     month: string;
//     'Total Consumption': number;
// }

// interface LineGraphData {
//     month: string;
//     'Direct Consumption': number;
//     'UJV Consumption': number;
//     'Daily Volume Target': number;
// }

// /**
//  * Generates sample NNPC consumption data
//  * @param months Number of months to generate data for (default: 12)
//  * @param baseConsumption Base consumption value to calculate around (default: 250)
//  * @param variance Maximum random variance from base consumption (default: 100)
//  */
// export const generateNNPCData = (
//     months: number = 12,
//     baseConsumption: number = 250,
//     variance: number = 100
// ): NNPCData[] => {
//     const monthNames = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     return Array.from({ length: months }, (_, i) => ({
//         month: monthNames[i % 12],
//         'Total Consumption': Math.floor(
//             baseConsumption + (Math.random() * 2 - 1) * variance
//         )
//     }));
// };

// /**
//  * Generates sample line graph data with Direct Consumption, UJV Consumption, and Daily Volume Target
//  * @param months Number of months to generate data for (default: 12)
//  * @param targetVolume Fixed daily volume target (default: 130)
//  * @param baseConsumption Base consumption value for both Direct and UJV (default: 130)
//  * @param variance Maximum random variance from base consumption (default: 40)
//  */
// export const generateLineGraphData = (
//     months: number = 12,
//     targetVolume: number = 130,
//     baseConsumption: number = 130,
//     variance: number = 40
// ): LineGraphData[] => {
//     const monthNames = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     return Array.from({ length: months }, (_, i) => ({
//         month: monthNames[i % 12],
//         'Direct Consumption': Math.floor(
//             baseConsumption + (Math.random() * 2 - 1) * variance
//         ),
//         'UJV Consumption': Math.floor(
//             baseConsumption + (Math.random() * 2 - 1) * variance
//         ),
//         'Daily Volume Target': targetVolume
//     }));
// };
