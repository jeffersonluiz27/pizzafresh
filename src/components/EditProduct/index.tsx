import { ReactComponent as Pencil } from 'assets/icons/edit.svg';
import { useEffect, useState } from 'react';
import { Product, ProductResponse, ProductUpdate } from 'types/api/product';
import * as S from './style';

interface EditProductProps {
	product: ProductResponse;
	onCancel: boolean;
	onEdit: (data: ProductUpdate) => void;
	onDelete: (data: ProductResponse) => void;
	
}

const EditProduct = ({
	product,
	onCancel,
	onEdit,
	onDelete,
}: EditProductProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const form = {
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.image,
		description: product.description,
	};

	const [state, setState] = useState(form);

	const productEditFormatter = (toFormat: typeof form): Product => ({
		name: toFormat.name,
		price: toFormat.price,
		description: toFormat.description,
		image: toFormat.image,
	});

	const handleChange = (name: string, value: string | number) => {
		setState({...state, [name]: value });
		const productFormatted = {product: productEditFormatter(state), id: product.id};
		onEdit(productFormatted);
	};

	const onEditClick = () => {
		setIsEditing(true);
		const productFormatted = {product: productEditFormatter(state), id: product.id};
		onEdit(productFormatted);
	};

	useEffect(() => {
		setIsEditing(false);
	}, [onCancel]);

	return (
		<S.EditProduct role={'listitem'}>
			{!isEditing ? (
				<>
					<S.EditProductImage
						src={product.image}
						alt={`Pizza de ${product.name}`}
					/>
					<S.EditProductDetails>
						<S.EditProductDetailsName>{product.name}</S.EditProductDetailsName>
						<S.EditProductDetailsPrice>
							{product.price}
						</S.EditProductDetailsPrice>
						<S.EditProductDetailsDescription>
							{product.description}
						</S.EditProductDetailsDescription>
					</S.EditProductDetails>
					<S.EditProductAction onClick={() => onEditClick()}>
						<Pencil /> Editar
					</S.EditProductAction>
				</>
			) : (
				<S.EditFormGroup>
					<S.EditForm
						type="text"
						placeholder="Título"
						success={Boolean(state.name.length)}
						value={state.name}
						onChange={({ target }) => handleChange('name', target.value)}
					/>
					<S.EditForm
						type="number"
						placeholder="Preço"
						success={Boolean(state.price.toString().length)}
						value={state.price || ''}
						onChange={({ target }) => handleChange('price', +target.value)}
					/>
					<S.EditForm
						type="text"
						placeholder="Descrição"
						success={Boolean(state.description.length)}
						value={state.description}
						onChange={({ target }) => handleChange('description', target.value)}
					/>
					<S.EditForm
						type="url"
						placeholder="Imagem"
						success={Boolean(state.image.length)}
						value={state.image}
						onChange={({ target }) => handleChange('image', target.value)}
					/>
					<S.Delete onClick={() => onDelete(product)}>Deletar</S.Delete>
				</S.EditFormGroup>
			)}
		</S.EditProduct>
	);
};

export default EditProduct;
