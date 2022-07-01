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

const Home = () => {
	const dateDescription = DateTime.now().toLocaleString({
		...DateTime.DATE_SHORT,
		weekday: 'long',
	});
	const navigate = useNavigate();
	const handleNavigation = (path: RoutePath) => navigate(path);

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
							<ProductItem />
						</ProductItemList>
					</S.HomeProductList>
				</div>
			</S.HomeContent>
			<aside>
				<OrderDetails />
			</aside>
			{/* <Overlay>
                <CheckoutSection />
            </Overlay> */}
		</S.Home>
	);
};

export default Home;
