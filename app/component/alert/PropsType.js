/**
 * @format
 */

export interface AlertViewProps {
    title:? AlertTitle;
    custom:? AlertCustom;
    customMessag:? AlertCustom;
    isCancel?: boolean;
    isBlack?: boolean;
    message?: AlertMessage;
  header?: HeaderStyle;
    buttons: AlertButton[];
    onClose?: (event: AlertEvent) => void;
}

export type AlertTitle = string[] | string;

export type AlertCustom = function;

export type AlertMessage =
    | {
          align: 'justify' | 'center' | 'left' | 'right';
          text: string;
      }
    | string;

export type AlertButton = {
    type: 'ok' | 'cancel';
    name: string;
};
export type HeaderStyle = {
};

export type AlertEvent = {
    index: number;
    button: AlertButton;
};
