import { ReactComponent as Pencil } from 'assets/icons/edit.svg';
import { useEffect, useState } from 'react';
import { ProductResponse } from 'types/api/product';
import * as S from './style';

interface EditProductProps {
	product: ProductResponse;
	onCancel: boolean;
	onEdit: (data: ProductResponse) => void;
	onDelete: (data: ProductResponse) => void;
	
}

const EditProduct = ({
	product,
	onCancel,
	onEdit,
	onDelete,
}: EditProductProps) => {
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setIsEditing(false);
	}, [onCancel]);

	const form = {
		name: product.name,
		price: product.price,
		image: product.image,
		description: product.description,
	};

	const [state, setState] = useState(form);

	const productEditFormatter = (toFormat: typeof form): ProductResponse => ({
		id: product.id,
		name: toFormat.name,
		price: toFormat.price,
		description: toFormat.description,
		image: toFormat.image,
	});

	const handleChange = (name: string, value: string | number) => {
		setState({...state, [name]: value });
		const productFormatted = productEditFormatter(state);
		onEdit(productFormatted);
	};

	const onEditClick = () => {
		setIsEditing(true);
		const productFormatted = productEditFormatter(state);
		onEdit(productFormatted);
	};

	

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
