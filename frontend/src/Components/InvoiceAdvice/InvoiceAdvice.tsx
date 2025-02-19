interface InvoiceData {
  to: string
  from: string
  ref: string
  date: string
  actualQuantity: string
  billedQuantity: string
  unitPrice: string
  takeOrPayQuantity: string
  makeUpGas: string
  vat: string
  subtotal: string
  total: string
  notes: string[]
  signatures: {
    preparedBy: string
    checkedBy: string
    certifiedBy: string
    approvedBy: string
  }
}

const defaultData: InvoiceData = {
  to: "Dangote Sugar",
  from: "Finance Department",
  ref: "INV-2023-001",
  date: "October 28, 2023",
  actualQuantity: "752.542836 MMSCF",
  billedQuantity: "752.542836 MMSCF",
  unitPrice: "4,056.61 =N=/MSCF",
  takeOrPayQuantity: "650.8016 MMSCF",
  makeUpGas: "0 MMSCF",
  vat: "228,958,004.46 =N=",
  subtotal: "3,052,773,392.82 =N=",
  total: "3,281,731,397.28 =N=",
  notes: [
    "The applicable gas price for year 2023 is $5.32/Mscf based on GSPA.",
    "The price is based on exchange rate of =N=762.52 to $1 as per CBN average exchange rate for the month of August, 2023."
  ],
  signatures: {
    preparedBy: "YAHAYA, I. B.",
    checkedBy: "MANGETE, A. B.",
    certifiedBy: "ABDULSALAM, A.",
    approvedBy: "HARANJI, Y."
  }
}

export default function InvoiceAdvice({ data = defaultData }: { data?: InvoiceData }) {
  const formatSignatureTitle = (key: string) => {
    const words = key.split(/(?=[A-Z])/)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ').replace('By', 'by')
  }


  return (
    <div className="min-h-screen  p-5">
      <div className="mx-auto max-w-4xl rounded-xl bg-white shadow-lg">
        <div className="p-10">
          <h1 className="mb-8 text-center text-2xl font-bold uppercase tracking-wider text-[#006B3F] border-b border-[#006B3F] pb-2">
            Invoice Advice
          </h1>
          <div className="mb-8 flex justify-between rounded-lg bg-[#e6f3ed] p-5">
            <div>
              <p className="mb-1">
                <strong className="text-sm text-[#006B3F]">To:</strong>{" "}
                <span className="text-base">{data.to}</span>
              </p>
              <p>
                <strong className="text-sm text-[#006B3F]">From:</strong>{" "}
                <span className="text-base">{data.from}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="mb-1">
                <strong className="text-sm text-[#006B3F]">Ref:</strong>{" "}
                <span className="text-base">{data.ref}</span>
              </p>
              <p>
                <strong className="text-sm text-[#006B3F]">Date:</strong>{" "}
                <span className="text-base">{data.date}</span>
              </p>
            </div>
          </div>
          <div className="mb-8 overflow-hidden rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#006B3F] text-white">
                  <th className="border border-[#006B3F] p-3 text-left text-base">Actual Quantity</th>
                  <th className="border border-[#006B3F] p-3 text-left text-base">Billed Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-[#006B3F] p-3 text-base">{data.actualQuantity}</td>
                  <td className="border border-[#006B3F] p-3 text-base">{data.billedQuantity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-5 rounded-lg bg-gray-50 p-5">
            <div>
              <p className="mb-1 text-sm font-bold text-[#006B3F]">Unit Price:</p>
              <p className="text-base">{data.unitPrice}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-bold text-[#006B3F]">Take or Pay Quantity:</p>
              <p className="text-base">{data.takeOrPayQuantity}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-bold text-[#006B3F]">Make up Gas:</p>
              <p className="text-base">{data.makeUpGas}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-bold text-[#006B3F]">VAT (7.5%):</p>
              <p className="text-base">{data.vat}</p>
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-[#e6f3ed] p-5">
            <div className="mb-2 flex justify-between border-b border-[#006B3F] pb-2">
              <span className="text-lg text-[#006B3F]">Subtotal:</span>
              <span className="text-lg font-bold">{data.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold text-[#006B3F]">Total:</span>
              <span className="text-2xl font-bold text-[#006B3F]">{data.total}</span>
            </div>
          </div>
          <div className="mb-8 rounded-lg bg-gray-50 p-5 border-l-4 border-[#006B3F]">
            <h3 className="mb-2 text-[#006B3F]">Note:</h3>
            {data.notes.map((note, index) => (
              <p key={index} className="text-sm">
                {index + 1}. {note}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5">
            {Object.entries(data.signatures).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-gray-50 p-4">
                <p className="mb-2 text-[#006B3F]">
                  <strong>{formatSignatureTitle(key)}:</strong>
                </p>
                <p className="mb-4">{value}</p>
                <div className="border-t border-[#006B3F] pt-1">
                  <p className="text-xs text-gray-500">Signature</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}