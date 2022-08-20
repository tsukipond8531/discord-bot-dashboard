import {useContext} from "react";
import {SettingsContext} from "../contexts/SettingsContext";

export const Languages = [
    { label: "Chinese", value: "zh"},
    { label: "English", value: "en"}
]

/**
 *
 * @param lang {string}
 * @param props {{[key: string]: string}}
 * @return {string}
 */
export function locale(lang, props) {
    return props[lang]
}

/**
 * @return {({[key: string]: string}) => string}
 */
export function useLocale() {
    const {language} = useContext(SettingsContext)

    return (props) => {
        return props[language] || props["en"]
    }
}

/**
 * @param props {{[key: string]: string}}
 * @constructor
 */
export function Locale(props) {
    const {language} = useContext(SettingsContext)

    return props[language] || props["en"]
}