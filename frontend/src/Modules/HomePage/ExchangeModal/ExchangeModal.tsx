import React, { useState, useEffect } from "react";
import swap_token from "../../../services/pool/swap_token";
import "./ExchangeModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";

interface modal_props {
    signer: any;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (fromToken: string, toToken: string, amount: number) => void;
    pool_info: any;
    pool_contract: any;
}

interface target_token_interface {
    sending_token: string | null;
    received_token: string | null;
}

const ExchangeModal: React.FC<modal_props> = ({
    signer,
    isOpen,
    onClose,
    pool_info,
    pool_contract,
}) => {
    const [amount, set_amount] = useState<number>(0);
    const [target_token, set_token_target] = useState<target_token_interface>({sending_token:pool_info.token1_address,received_token: pool_info.token2_address}); //смена типа токенов
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === "" || isNaN(Number(value)) || Number(value) < 0) {
            setError("Пожалуйста, введите корректное число.");
            set_amount(0);
            setResult(null);
        } else {
            setError(null);
            set_amount(Number(value));
        }
    };

    const handle_token_swap = () => {
        //смена обмениваемых токенов
        const new_token_target: target_token_interface = {
            sending_token: target_token?.received_token,
            received_token: target_token?.sending_token,
        };
        set_token_target(new_token_target);
    };

    return isOpen ? (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>Обмен токенов</h2>
                {result == null && (
                    <>
                        <p>
                            Введите число для обмена{" "}
                            <strong>
                                {target_token?.sending_token ===
                                pool_info.token1_address
                                    ? pool_info.type.split("-")[0]
                                    : pool_info.type.split("-")[1]}
                            </strong>{" "}
                            на{" "}
                            <strong>
                                {target_token?.received_token ===
                                pool_info.token2_address
                                    ? pool_info.type.split("-")[1]
                                    : pool_info.type.split("-")[0]}
                            </strong>
                        </p>
                    </>
                )}
                <label>
                    Количество:
                    <input
                        type="number"
                        value={amount > 0 ? amount : ""}
                        onChange={handleAmountChange}
                    />
                </label>
                {error && <div className="errorPopup">{error}</div>}
                <button
                    className="swapButton"
                    title="Поменять"
                    onClick={handle_token_swap}
                >
                    <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
                <div className="modalButtons">
                    <button
                        onClick={() => {
                            swap_token(
                                signer,
                                pool_contract,
                                amount,
                                target_token?.sending_token,
                                target_token?.received_token
                            );
                        }}
                    >
                        Подтвердить
                    </button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ExchangeModal;
