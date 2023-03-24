import * as S from './style';
import { ReactComponent as Trash } from 'assets/icons/trash.svg';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { ProductResponse } from 'types/products';
import { OrderItemType } from 'types/orderItemType';

type DivType = ButtonHTMLAttributes<HTMLDivElement>;

export type OrderItemProps = {
	canDelete?: Boolean;
	product: ProductResponse;
	quantity: number;
	description?: string;
	onRemoveItem?: () => void;
	onItemChange: (item: OrderItemType) => void;
} & DivType;

const OrderItem = ({
	product,
	quantity,
	description = '',
	canDelete = true,
	onRemoveItem,
	onItemChange,
	...props
}: OrderItemProps) => {
	const [quntityState, setQuantityState] = useState(quantity);
	const [descriptionState, setDescriptionState] = useState(description);

	const handleDescription = (data: string) => {
		setDescriptionState(data);
	};

	const handleQuantity = (data: number) => {
		setQuantityState(data);
	};

	const handleChange = (quntityParam: number, descriptionParam: string) => {
		onItemChange({
			product: product,
			quantity: quntityParam,
			description: descriptionParam,
		});
	};

	useEffect(() => {
		handleDescription(description);
	}, [description]);

	useEffect(() => {
		handleQuantity(quantity);
	}, [quantity]);

	return (
		<S.OrderItem {...props} role={'listitem'}>
			<S.OrderItemLeft>
				<S.OrderItemLeftTop>
					<S.OrderItemProduct>
						<S.OrderItemProductImage
							src={product.image}
							alt={`Pizza de ${product.name}`}
						/>
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
						onChange={({ target }) => {
							setQuantityState(Number(target.value));
							handleChange(Number(target.value), descriptionState);
						}}
					/>
				</S.OrderItemLeftTop>
				<S.OrderItemLeftObservation
					type="text"
					placeholder="Observações do pedido"
					value={descriptionState}
					onChange={({ target }) => {
						setDescriptionState(target.value);
						handleChange(quntityState, target.value);
					}}
				/>
			</S.OrderItemLeft>
			<S.OrderItemRight>
				<S.OrderItemRightTotalPrice>
					R$ {Number(product.price * quntityState).toFixed(2)}
				</S.OrderItemRightTotalPrice>
				{canDelete && (
					<S.OrderItemRightTrash onClick={onRemoveItem}>
						<Trash />
					</S.OrderItemRightTrash>
				)}
			</S.OrderItemRight>
		</S.OrderItem>
	);
};

export default OrderItem;
