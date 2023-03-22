import Menu from 'components/Menu';
import { DateTime } from 'luxon';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import * as S from './style';
import { RoutePath } from 'types/routes';
import { navigationItems } from 'data/navigation';
import ProductItemList from 'components/ProductItemList';
import ProductItem from 'components/ProductItem';
import OrderDetails from 'components/OrderDetails';
import CheckoutSection from 'components/CheckoutSection';
import { useNavigate } from 'react-router-dom';
import Overlay from 'components/Overlay';
import { products } from 'mocks/products';
import { orders } from 'mocks/orders';
import { ProductResponse } from 'types/products';
import { OrderType } from 'types/ordertype';
import { useState } from 'react';

const Home = () => {
	const dateDescription = DateTime.now().toLocaleString({
		...DateTime.DATE_SHORT,
		weekday: 'long',
	});
	const navigate = useNavigate();

	const [activeOrderType, setActiveOrderType] = useState(
		OrderType.COMER_NO_LOCAL
	);

	const handleNavigation = (path: RoutePath) => navigate(path);
	const handleSelection = (product: ProductResponse) => {};

	return (
		<S.Home>
			<Menu
				active={RoutePath.HOME}
				navItems={navigationItems}
				onNavigate={handleNavigation}
				onLogout={() => navigate(RoutePath.LOGIN)}
			/>
			<S.HomeContent>
				<header>
					<S.HomeHeaderDetails>
						<div>
							<S.HomeHeaderDetailsLogo>Pizza Fresh</S.HomeHeaderDetailsLogo>
							<S.HomeHeaderDetailsDate>
								{dateDescription}
							</S.HomeHeaderDetailsDate>
						</div>
						<S.HomeHeaderDetailsSearch>
							<Search />
							<input type="text" placeholder="Procure pelo sabor" />
						</S.HomeHeaderDetailsSearch>
					</S.HomeHeaderDetails>
				</header>
				<div>
					<S.HomeProductTitle>
						<b>Pizzas</b>
					</S.HomeProductTitle>
					<S.HomeProductList>
						<ProductItemList>
							{Boolean(products.length) && 
								products.map((product, index) => (
									<ProductItem 
										product={product}
										key={`ProductItem-${index}`}
										onSelect={handleSelection}
									/>
							))}
						</ProductItemList>
					</S.HomeProductList>
				</div>
			</S.HomeContent>
			<aside>
				<OrderDetails 
					orders={orders}
					onChangeActiveOrderType={(data) => setActiveOrderType(data)}
					activeOrderType={activeOrderType}
				/>
			</aside>
			{/* <Overlay>
                <CheckoutSection />
      </Overlay> */}
		</S.Home>
	);
};

export default Home;
