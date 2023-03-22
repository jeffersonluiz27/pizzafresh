import * as S from './style';

interface ProductItemListProps {
	onSelectTable: (data: number) => void
	children: React.ReactNode;
}

const ProductItemList = ({ children, onSelectTable }: ProductItemListProps) => {
	return (
		<section>
			<S.ProductItemListHeader>
				<S.ProductItemListHeaderTitle>
					Escolha os sabores
				</S.ProductItemListHeaderTitle>
				<S.ProductItemListHeaderSelect
					onChange={({target}) => onSelectTable(Number(target.value))}
					name='table'
					id='table'
				>
					<option value="default">Selecione a mesa</option>
					<option value="01">Mesa 01</option>
					<option value="02">Mesa 02</option>
				</S.ProductItemListHeaderSelect>
			</S.ProductItemListHeader>
			<S.ProductItemList>{children}</S.ProductItemList>
		</section>
	);
};

export default ProductItemList;
