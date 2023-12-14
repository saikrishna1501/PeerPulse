import Language from "../models/language";
import english from "../languages/english";
import spanish from "../languages/spanish";


const getLanguageObject = (languageSelector: any) => {
    switch(languageSelector) {
        case Language.ENGLISH:
            return english
        case Language.SPANISH:
            return spanish
        default:
            return english
    }
}

export default getLanguageObject;