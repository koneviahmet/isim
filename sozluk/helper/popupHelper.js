import {Popup} from 'semantic-ui-react'

const PopupHelper = ({title, children}) => {
    return (
        <Popup content={title} trigger={children} />
    )
}

export default PopupHelper;
