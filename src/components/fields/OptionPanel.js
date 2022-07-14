import {Box, Switch, Text} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import {SelectField} from "components/fields/SelectField";
import {InputField} from "./InputField";
import MessageBuildCard from "./complex/MessageBuildCard";
import ColorField from "./ColorField";
import {createContext, useContext, useMemo} from "react";
import ArrayField from "./complex/ArrayField";
import TextArea from "./TextArea";
import IdSelectField from "./IdSelectField";
import ImageField from "./ImageField";
import EmojiField from "./EmojiField";
import PairField from "./complex/PairField";

export function OptionPanel({value, onChange, option}) {
    const input = useInput(value, onChange, option)

    const inline = option.type === "boolean"

    return (
        <Card flexDirection={inline ? "row-reverse" : "column"} gap={5}>
            <Box w="full">
                <Text fontWeight="extrabold" fontSize="xl">
                    {option.name}
                </Text>
                <Text>{option.description}</Text>
            </Box>
            {input}
        </Card>
    );
}

export function useInput(value, onChange, option) {
    let field = useMemo(
        () => getInput(value, onChange, option),
        [onChange, option, value]
    )
    const handlers = useContext(OptionHandlerContext)

    if (field != null) {
        return field
    }
    const handler = handlers && handlers[option.type]

    if (handler) {
        return handler({value, onChange, option})
    }
}

export function getInput(value, onChange, option) {

    switch (option.type) {
        case "message_create":
            return (
                <MessageBuildCard value={value} onChange={onChange} />
            );
        case "array":
            return (
                <ArrayField element={option.element} value={value} onChange={onChange} />
            )
        case "color":
            return <ColorField
                value={value}
                onChange={onChange}
            />
        case "boolean":
            return (
                <Switch
                    colorScheme="brandScheme"
                    size="md"
                    isChecked={value}
                    variant="main"
                    onChange={({target}) => onChange(target.checked)}
                />
            );
        case "long_string":
            return (
                <TextArea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            )
        case "number":
        case "string":
            const isText = option.type === "string";
            return (
                <InputField
                    type={isText ? "text" : "number"}
                    value={value}
                    placeholder={isText ? "請輸入文字" : "請輸入數字"}
                    onChange={({target}) =>
                        onChange(isText ? target.value : target.valueAsNumber)
                    }
                />
            );
        case "enum":
            return (
                <SelectField
                    options={option.choices.map((choice) => ({
                        label: choice,
                        value: choice,
                    }))}
                    placeholder="選擇一個項目"
                    value={value}
                    onChange={onChange}
                    isMulti={option.multiple}
                />
            );
        case "id_enum":
            return (
                <IdSelectField
                    value={value}
                    onChange={onChange}
                    options={option.choices}
                    multiple={option.multiple}
                    element={option.element}
                />
            )
        case "image":
            return (
                <ImageField value={value} onChange={onChange}/>
            )
        case "emoji":
            return (
                <EmojiField value={value} onChange={onChange}/>
            )
        case "pair":
            return (
                <PairField element={option.element} value={value} onChange={onChange}/>
            )
        default:
            return null;
    }
}

export function OptionField({value, onChange, option}) {
    return useInput(value, onChange, option)
}

export const OptionHandlerContext = createContext({})