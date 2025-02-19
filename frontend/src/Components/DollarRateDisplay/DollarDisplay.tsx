import { Edit } from "lucide-react"
import { useState, useEffect } from "react"
import Modal from "../Modal/Modal";
import { UserState } from "@/Redux/types";
import { useSelector } from "react-redux";


interface DollarConversionRateModalProps {
    isOpen: boolean
    onClose: () => void
    onRateSave: (rate: string) => void
    currentRate: string | null
}

const DollarConversionRateModal: React.FC<DollarConversionRateModalProps> = ({
    isOpen,
    onClose,
    onRateSave,
    currentRate,
}) => {
    const [inputRate, setInputRate] = useState<string>(currentRate || "")

    const handleSave = () => {
        const cleanedRate = inputRate.replace(/[^\d.]/g, '')
        if (cleanedRate) {
            onRateSave(cleanedRate)
        }
    }

    if (!isOpen) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Update Monthly USD Rate"
            subTitle="Set the current dollar conversion rate"
            size="small"
            buttons={[
                <button
                    key="cancel"
                    className=" p-2 text-white border border-white rounded hover:bg-green-50"
                    onClick={onClose}
                >
                    Cancel
                </button>,
                <button
                    key="save"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleSave}
                >
                    Save
                </button>
            ]}
        >
            <div className="p-4">
                <label htmlFor="conversion-rate" className="block mb-2 text-sm font-medium text-gray-700">
                    Conversion Rate (Naira per USD)
                </label>
                <div className="flex items-center">
                    <span className="mr-2 text-gray-500">₦</span>
                    <input
                        id="conversion-rate"
                        type="text"
                        value={inputRate}
                        onChange={(e) => setInputRate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter conversion rate"
                    />
                </div>
            </div>
        </Modal>
    )
}

interface DollarConversionRateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRateSave: (rate: string) => void;
}

export default function Component() {
    const [rate, setRate] = useState<string | null>("0.00")
    const [currentMonth, setCurrentMonth] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const userRole = useSelector((state: { user: UserState }) => state.user.role)

    useEffect(() => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        const now = new Date()
        setCurrentMonth(months[now.getMonth()])
    }, [])

    const handleRateSave = (newRate: string) => {
        setRate(newRate)
        setIsModalOpen(false)
    }

    return (
        <div className="mt-4">
            <div className="p-3 bg-white border border-green-600 rounded-md shadow-sm">
                <div className="flex justify-between items-start mb-2 gap-20 ">
                    <div>
                        <h3 className="text-sm font-semibold text-green-800">Monthly USD Rate</h3>
                        <p className="text-xs text-green-600">{currentMonth}</p>
                    </div>
                    <div>
                        {rate && (
                            <p className="text-lg font-bold text-green-700">
                                <span className="text-sm font-normal mr-1">₦</span>{rate}
                            </p>
                        )}
                    </div>
                </div>
                {userRole === 'admin' && (
                    <>
                        {rate ? (
                            <button
                                className="w-full px-3 py-1.5 text-sm bg-green-50 text-green-700 border border-green-600 rounded hover:bg-green-600 hover:text-white transition-colors duration-200 flex items-center justify-center group"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Edit className="w-4 h-4 mr-1 group-hover:text-white" />
                                Edit Rate
                            </button>
                        ) : (
                            <button
                                className="w-full px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Set Monthly Dollar Conversion Rate
                            </button>
                        )}
                        <DollarConversionRateModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onRateSave={handleRateSave}
                            currentRate={rate}
                        />
                    </>
                 )} 
            </div>
        </div>
    )
}