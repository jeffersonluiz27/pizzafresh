import * as S from './style';
import { ReactComponent as Trash } from 'assets/icons/trash.svg';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { ProductResponse } from 'types/products';

type DivType = ButtonHTMLAttributes<HTMLDivElement>

export type OrderItemProps = {
	product: ProductResponse;
	quantity: number;
	observation?: string;
} & DivType;

const OrderItem = ({product, quantity, observation = '', ...props}: OrderItemProps) => {
	const [quntityState, setQuantityState] = useState(quantity);
	const [observationState, setObservationState] = useState(observation);

	const handleObservation = (data: string) => {
		setObservationState(data);
	};

	const handleQuantity = (data: number) => {
		setQuantityState(data);
	};

	useEffect(() => {
		handleObservation(observation)
	}, [observation]);

	useEffect(() => {
		handleQuantity(quantity)
	}, [quantity]);

	return (
		<S.OrderItem {...props} role={'listitem'}>
			<S.OrderItemLeft>
				<S.OrderItemLeftTop>
					<S.OrderItemProduct>
						<S.OrderItemProductImage src={product.image} alt={`Pizza de ${product.name}`} />
						<S.OrderItemProductDetails>
							<S.OrderItemProductDetailsName>
								{product.name}
							</S.OrderItemProductDetailsName>
							<S.OrderItemProductDetailsPrice>
								R$ {product.price}
							</S.OrderItemProductDetailsPrice>
						</S.OrderItemProductDetails>
					</S.OrderItemProduct>
					<S.OrderItemQuantity 
						type="number" 
						value={quntityState}
						onChange={({target}) => {
							setQuantityState(Number(target.value))
						}}
					/>
				</S.OrderItemLeftTop>
				<S.OrderItemLeftObservation
					type="text"
					placeholder="Observações do pedido"
					value={observationState}
					onChange={({target}) => {
						setObservationState(target.value)
					}}
				/>
			</S.OrderItemLeft>
			<S.OrderItemRight>
				<S.OrderItemRightTotalPrice>R$ {Number(product.price * quntityState).toFixed(2)}</S.OrderItemRightTotalPrice>
				<S.OrderItemRightTrash>
					<Trash />
				</S.OrderItemRightTrash>
			</S.OrderItemRight>
		</S.OrderItem>
	);
};

export default OrderItem;
