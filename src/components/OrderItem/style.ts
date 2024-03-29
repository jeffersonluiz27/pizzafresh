import styled, { css } from 'styled-components';

export const OrderItem = styled.div`
	${() => css`
		display: flex;
		gap: 15px;
	`}
`;

export const OrderItemLeft = styled.div`
	${() => css`
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 70%;
	`}
`;

export const OrderItemLeftTop = styled.div`
	${() => css`
		display: flex;
		justify-content: space-between;
		/* Chrome */
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		/* Firefox */
		input[type='number'] {
			-moz-appearance: textfield;
		}
	`}
`;

export const OrderItemLeftObservation = styled.input`
	${({ theme }) => css`
		${theme.mixins.input()};
		color: ${theme.colors.textColor};
	`}
`;

export const OrderItemRight = styled.div`
	${() => css`
		display: flex;
		flex-direction: column;
		gap: 10px;
	`}
`;

export const OrderItemRightTotalPrice = styled.span`
	${({ theme }) => css`
		${theme.mixins.bodyStyle()};
		font-weight: 500;
		font-size: 16px;
		height: 48px;
		display: flex;
		align-items: center;
	`}
`;

export const OrderItemRightTrash = styled.button`
	${({ theme }) => css`
		${theme.mixins.buttonOutline(theme.colors.secondaryColor, true)};
	`}
`;

export const OrderItemQuantity = styled.input`
	${({ theme }) => css`
		${theme.mixins.input()};
		width: 48px;
		text-align: center;
		color: ${theme.colors.textColor};
	`}
`;

export const OrderItemProduct = styled.div`
	${() => css`
		display: flex;
	`}
`;

export const OrderItemProductImage = styled.img`
	${() => css`
		width: 45px;
		height: 45px;
	`}
`;

export const OrderItemProductDetails = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		gap: 5px;
		${theme.mixins.bodyStyle()};
	`}
`;

export const OrderItemProductDetailsName = styled.span`
	${() => css`
		font-weight: 500;
	`}
`;

export const OrderItemProductDetailsPrice = styled.span`
	${({ theme }) => css`
		color: ${theme.colors.textLight};
		font-size: 12px;
	`}
`;
