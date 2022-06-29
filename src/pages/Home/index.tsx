import * as S from './style';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { DateTime } from 'luxon';
import Menu from '../../components/Menu';
import { RoutePath } from '../../types/routes';
import { navigationItems } from '../../data/navigation';
import ProductItemList from 'components/ProductItemList';
import ProductItem from 'components/ProductItem';
import OrderDetails from 'components/OrderDetails';

const Home = () => {
	const dateDescription = DateTime.now().toLocaleString({
		...DateTime.DATE_SHORT,
		weekday: 'long',
	});

	return (
		<S.Home>
			<Menu active={RoutePath.HOME} navItems={navigationItems} />
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
		</S.Home>
	);
};

export default Home;
