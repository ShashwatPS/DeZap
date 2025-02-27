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

interface FormSelectorProps {
    formType: string
    onClose: () => void
}

const FormSelector: React.FC<FormSelectorProps> = ({ formType, onClose }) => {
    switch (formType) {
        // Triggers
        case "checkEthBalance":
            return <CheckEthBalanceForm onClose={onClose} />
        case "checkEthWalletReceivesFunds":
            return <CheckWalletReceivesFundForm onClose={onClose} />
        case "checkEthWalletSendFunds":
            return <CheckEthWalletSendFundsForm onClose={onClose} />
        case "checkFunctionCalled":
            return <CheckFunctionCalledForm onClose={onClose} />
        case "nftFloorPrice":
            return <NFTFloorPriceForm onClose={onClose} />
        case "ethGasPrice":
            return <EthGasPriceForm onClose={onClose} />

        // Actions
        case "createListingOnOpenSea":
            return <CreateListingOnOpenSeaForm onClose={onClose} />
        case "createOfferOnOpenSea":
            return <CreateOfferOnOpenSeaForm onClose={onClose} />
        case "sendEmail":
            return <SendEmailForm onClose={onClose} />
        case "sendEthToMultipleWallets":
            return <SendEthToMultipleWalletsForm onClose={onClose} />
        case "sendSolToMultipleWallets":
            return <SendSolToMultipleWalletsForm onClose={onClose} />
        case "sendSolToSingleWallet":
            return <SendSolToSingleWalletForm onClose={onClose} />
        default:
            return <div>No form selected</div>
    }
}

export default FormSelector

