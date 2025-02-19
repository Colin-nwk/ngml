export type InvoiceAdviceDataType = {
  comments: { author: string; comment: string }[];
  lineItems: { sn: number; volume: number; date: string; other: string }[];
};

export const invoiceAdviceData = {
  comments: [
    {
      author: 'Chinwe Okafor',
      comment:
        'The order process was seamless, and I was impressed with how quickly everything was handled. The volume we ordered was delivered promptly, and the petrol quality was top-notch. Definitely planning to place another order soon.',
    },
    {
      author: 'Bola Adeyemi',
      comment:
        'We had a bit of confusion with the delivery date, but the support team sorted it out in no time. The fuel consumption was higher than expected this month, but the pricing and service quality were unmatched. Kudos to the logistics team for their efficiency.',
    },
  
  ],
  lineItems: [
    { sn: 1, volume: 641, date: '01/01/24', other: 'RX-8920-AZ' },
    { sn: 2, volume: 427, date: '02/01/24', other: 'QF-6729-BN' },
    { sn: 3, volume: 716, date: '03/01/24', other: 'MK-3947-PL' },
    { sn: 4, volume: 313, date: '04/01/24', other: 'TG-5821-XQ' },
    { sn: 5, volume: 607, date: '05/01/24', other: 'YU-2384-ZW' },
    { sn: 6, volume: 449, date: '06/01/24', other: 'BL-9823-WJ' },
    { sn: 7, volume: 242, date: '07/01/24', other: 'XS-5491-HY' },
    { sn: 8, volume: 767, date: '08/01/24', other: 'MN-1287-QF' },
    { sn: 9, volume: 420, date: '09/01/24', other: 'KP-3417-JD' },
    { sn: 10, volume: 187, date: '10/01/24', other: 'HF-9932-YL' },
    { sn: 11, volume: 74, date: '11/01/24', other: 'LT-2759-UR' },
    { sn: 12, volume: 107, date: '12/01/24', other: 'ZQ-6072-VN' },
    { sn: 13, volume: 353, date: '13/01/24', other: 'AX-4610-BP' },
    { sn: 14, volume: 756, date: '14/01/24', other: 'CN-7854-GL' },
    { sn: 15, volume: 366, date: '15/01/24', other: 'QY-1023-FV' },
    { sn: 16, volume: 80, date: '16/01/24', other: 'UR-3012-XD' },
    { sn: 17, volume: 445, date: '17/01/24', other: 'VT-4495-ZE' },
    { sn: 18, volume: 668, date: '18/01/24', other: 'PL-9093-SQ' },
    { sn: 19, volume: 412, date: '19/01/24', other: 'YG-5420-CM' },
    { sn: 20, volume: 39, date: '20/01/24', other: 'RF-1223-LD' },
    { sn: 21, volume: 26, date: '21/01/24', other: 'XN-8762-TP' },
    { sn: 22, volume: 264, date: '22/01/24', other: 'JF-5934-QR' },
    { sn: 23, volume: 586, date: '23/01/24', other: 'DT-6571-WK' },
    { sn: 24, volume: 363, date: '24/01/24', other: 'PV-3421-MY' },
    { sn: 25, volume: 261, date: '25/01/24', other: 'XK-9712-UC' },
    { sn: 26, volume: 489, date: '26/01/24', other: 'FW-4123-OB' },
    { sn: 27, volume: 247, date: '27/01/24', other: 'LX-3849-VP' },
    { sn: 28, volume: 580, date: '28/01/24', other: 'MP-5012-JW' },
    { sn: 29, volume: 337, date: '29/01/24', other: 'HK-9034-SD' },
    { sn: 30, volume: 680, date: '30/01/24', other: 'QL-7528-EN' },
  ],
};

