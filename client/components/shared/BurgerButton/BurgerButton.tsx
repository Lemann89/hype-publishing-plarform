import { classNames } from "../../../utils/className";

export const BurgerButton = ({ isActive, onClick }) => {
    return (
        <div
            className={classNames(['burger-btn', isActive && 'active'])}
            onClick={onClick}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};
