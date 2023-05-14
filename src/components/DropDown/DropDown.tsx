import { Dropdown } from "@nextui-org/react";
import { FC, Key } from "react";

interface IAppDropDown {
    buttonColor:"primary"|"default"|"secondary"|"success"|"warning"|"error"|"gradient";
    placeholder:string;
    value:string|number;
    menuColor:"primary"|"default"|"secondary"|"success"|"warning"|"error"| undefined;
    onAction(value:Key):void;
    dropDownValues:Array<any>;
}

export const AppDropDown:FC<IAppDropDown> = ({buttonColor, placeholder, value , menuColor, onAction, dropDownValues}) => {
    return (
        <Dropdown >
            <Dropdown.Button color={buttonColor} shadow>
              {value ? value : placeholder}
            </Dropdown.Button>
            <Dropdown.Menu
              color={menuColor}
              variant="shadow"
              aria-label="Actions"
              onAction={onAction}
            >
              {dropDownValues.map((dropDownValue) => (
                    <Dropdown.Item key={dropDownValue} >{dropDownValue}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
    );
}