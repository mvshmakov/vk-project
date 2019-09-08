import * as React from "react";

interface IPropsWithId {
    id: string;
}
interface IStateWithActivePanel {
    activePanel: string;
}

export class Block<IP, IS> extends React.PureComponent<IP, IS> { }
export class Panel<IP extends IPropsWithId, IS>
    extends React.Component<IP, IS> { }
export class View<IP extends IPropsWithId, IS extends IStateWithActivePanel>
    extends React.Component<IP, IS> { }

export class PureBlock<IP, IS> extends React.PureComponent<IP, IS> { }
export class PurePanel<IP extends IPropsWithId, IS>
    extends React.PureComponent<IP, IS> { }
export class PureView<IP extends IPropsWithId, IS extends IStateWithActivePanel>
    extends React.PureComponent<IP, IS> { }

export interface IFunctionalBlock<IP> extends React.FunctionComponent<IP> { }
export interface IFunctionalPanel<IP extends IPropsWithId> extends React.FunctionComponent<IP> { }
