import type React from "react"
import CheckEthBalanceForm from "./triggers/CheckEthBalanceForm"
import CheckWalletReceivesFundForm from "./triggers/CheckWalletReceivesFundForm"
import CheckEthWalletSendFundsForm from "./triggers/CheckEthWalletSendFundsForm"
import CheckFunctionCalledForm from "./triggers/CheckFunctionCalledForm"
import NFTFloorPriceForm from "./triggers/NFTFloorPriceForm"
import EthGasPriceForm from "./triggers/EthGasPriceForm"
import CreateListingOnOpenSeaForm from "./actions/CreateListingOnOpenSeaForm"
import CreateOfferOnOpenSeaForm from "./actions/CreateOfferOnOpenSeaForm"
import SendEmailForm from "./actions/SendEmailForm"
import SendEthToMultipleWalletsForm from "./actions/SendEthToMultipleWalletsForm"
import SendSolToMultipleWalletsForm from "./actions/SendSolToMultipleWalletsForm"
import SendSolToSingleWalletForm from "./actions/SendSolToSingleWalletForm"
import SendSlackMessageForm from "./actions/SendSlackMessageForm"
interface FormSelectorProps {
    formType: string
    onClose: () => void
    handleSubmit: (data: any) => void
}

const FormSelector: React.FC<FormSelectorProps> = ({ formType, onClose, handleSubmit }) => {
    switch (formType) {
        // Triggers
        case "checkEthBalance":
            return <CheckEthBalanceForm onClose={onClose} onSubmit={handleSubmit} />
        case "checkEthWalletReceivesFunds":
            return <CheckWalletReceivesFundForm onClose={onClose} onSubmit={handleSubmit} />
        case "checkEthWalletSendFunds":
            return <CheckEthWalletSendFundsForm onClose={onClose} onSubmit={handleSubmit} />
        case "checkFunctionCalled":
            return <CheckFunctionCalledForm onClose={onClose} onSubmit={handleSubmit} />
        case "nftFloorPrice":
            return <NFTFloorPriceForm onClose={onClose} onSubmit={handleSubmit} />
        case "ethGasPrice":
            return <EthGasPriceForm onClose={onClose} onSubmit={handleSubmit} />

        // Actions
        case "create-listing":
            return <CreateListingOnOpenSeaForm onClose={onClose} onSubmit={handleSubmit} />
        case "create-offer":
            return <CreateOfferOnOpenSeaForm onClose={onClose} onSubmit={handleSubmit} />
        case "email":
            return <SendEmailForm onClose={onClose} onSubmit={handleSubmit} />
        case "multiple-eth":
            return <SendEthToMultipleWalletsForm onClose={onClose} onSubmit={handleSubmit} />
        case "multiple-sol":
            return <SendSolToMultipleWalletsForm onClose={onClose} onSubmit={handleSubmit} />
        case "send-sol":
            return <SendSolToSingleWalletForm onClose={onClose} onSubmit={handleSubmit} />
        case "slackMessage":
            return <SendSlackMessageForm onClose={onClose} />
        default:
            return <div>No form selected</div>
    }
}

export default FormSelector

