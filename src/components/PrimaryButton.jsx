import './PrimaryButton.css';

export const PrimaryButton = ({ children, onClick }) => {
    return (
        <button className="btn-primary" onClick={onClick}>
            {children}
        </button>
    );
};
