import * as S from './style';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { UserService } from 'services/UserService';
import { ErrorResponse } from 'types/api/error';
import { User, UserResponse, UserUpdate } from 'types/api/user';
import { QueryKey } from 'types/QueryKey';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import EditUser from 'components/EditUser';;

type ManageUsersType = HTMLAttributes<HTMLDivElement>;

type ManageUsersProps = {} & ManageUsersType;

const ManageUsers = ({ ...props }: ManageUsersProps) => {

	const [users, setUsers] = useState<UserResponse[]>([]);

	const { data: usersData } = useQuery(
		QueryKey.USERS,
		UserService.getLista
	)

	const [cancel, setCancel] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	type userToEditType = {id: string} & User;
	let usersToEdit: userToEditType[] = [];

	const form = {
		name: '',
		nick: '',
		pass: '',
		passConfirm: '',
		image: '',
	}
	
	const [userToAdd, setUserToAdd] = useState(form);

	const handleAddChange = (name: string, value: string) => {
		setUserToAdd({ ...userToAdd, [name]: value});
	};

	const onEditUser = (toEdit: UserUpdate) => {
		setCancel(false);
		const existing = usersToEdit.find((user) => user.id === toEdit.id);

		const userFormatted = { ...toEdit.user, id: toEdit.id};

		usersToEdit = existing 
		? usersToEdit.map((i) => (i.id === existing.id ? userFormatted : i)) 
		: [ ...usersToEdit, userFormatted];
	}

	const handleCancel = () => {
		setCancel(true);
		setIsAdding(false);
		setTimeout(() => setCancel(false));
		usersToEdit = [];
	};

	const handleDelete = (user: UserResponse) => {
		remove.mutate(user.id);
		handleCancel();
	}

	const add = useMutation(UserService.create, {
		onSuccess: (data: UserResponse & ErrorResponse) => {
			if(data.statusCode) {
				return;
			}

			const userList = [...users, data as UserResponse];
			setUsers(userList);
		},
		onError: () => {
			console.error("Erro ao criar um usuário");
		},
	});

	const update = useMutation(UserService.updateById, {
		onSuccess: (data: UserResponse & ErrorResponse) => {
			if(data.statusCode) {
				return;
			}

			const editedUsers = users.map((i) => data.id === i.id ? (data as UserResponse) : i);
			setUsers(editedUsers);
		},
		onError: () => {
			console.error("Erro ao atualizar o usuário")
		}
	});

	const remove = useMutation(UserService.deleteById, {
		onSuccess: (data: UserResponse & ErrorResponse) => {
			if(data.statusCode) {
				return;
			}

			const editedUsers = users.filter((i) => data.id !== i.id);
			setUsers(editedUsers);
		},
		onError: () => {
			console.error("Erro ao remover o usuário");
		},
	});

	const userIsValid = () => Boolean(
		userToAdd.name.length &&
		userToAdd.nick.length &&
		userToAdd.pass.length &&
		userToAdd.passConfirm.length &&
		userToAdd.image.length &&
		userToAdd.pass === userToAdd.passConfirm
	);

	const userFormatter = (toFormat: typeof form): User => ({
		nickname: toFormat.nick,
		name: toFormat.name,
		password: toFormat.pass,
		confirmPassword: toFormat.passConfirm,
		image: toFormat.image,
	});

	const handleSave = () => {
		const canAdd = userIsValid();
		const user = userFormatter(userToAdd);

		usersToEdit.forEach((user) => 
			update.mutate({user, id: user.id})
		);

		if(canAdd) add.mutate(user);
		setTimeout(() => handleCancel(), 300);
		setUserToAdd(form)
		setIsAdding(false)
	}

	useEffect(() => {
		setUsers(usersData || []);
	}, [usersData]);
	
	return (
		<S.ManageUsers {...props}>
			<S.ManageUsersTitle>Gerenciar Usuários</S.ManageUsersTitle>
			<S.ManageUsersSub>
				<b>Usuários</b>
			</S.ManageUsersSub>
			<S.ManageUsersContent>
				{!isAdding ? (
				<S.ManageUsersContentAdd onClick={() => setIsAdding(true)}>
					<Add />
					<span>Adicionar Usuário</span>
				</S.ManageUsersContentAdd>
				): (
				<S.ManageUsersContentAdd>
					<S.EditForm 
						type="text" 
						placeholder="Nome" 
						success={Boolean(userToAdd.name.length)}
						value={userToAdd.name}
						onChange={({target}) => handleAddChange("name", target.value)}
					/>
					<S.EditForm 
						type="text" 
						placeholder="Nome de usuário"
						success={Boolean(userToAdd.nick.length)}
						value={userToAdd.nick}
						onChange={({target}) => handleAddChange("nick", target.value)}
					/>
					<S.EditForm 
						type="password" 
						placeholder="Senha" 
						minLength={6}
						success={Boolean(userToAdd.pass.length)}
						value={userToAdd.pass}
						onChange={({target}) => handleAddChange("pass", target.value)}
					/>
					<S.EditForm 
						type="password" 
						placeholder="Confirmar Senha" 
						minLength={6}
						success={Boolean(userToAdd.passConfirm.length &&
							userToAdd.pass === userToAdd.passConfirm
						)}
						error={Boolean(
							userToAdd.passConfirm.length &&
							userToAdd.pass.length &&
							userToAdd.pass !== userToAdd.passConfirm
						)}
						value={userToAdd.passConfirm}
						onChange={({target}) => handleAddChange("passConfirm", target.value)}
				  />
					<S.EditForm 
						type="url" 
						placeholder="Imagem"
						success={Boolean(userToAdd.image.length)}
						value={userToAdd.image}
						onChange={({target}) => handleAddChange("image", target.value)}
					/>
				</S.ManageUsersContentAdd>
				)}
				{
					users.map((user, index) => (
						<EditUser 
							user={user}
							key={index}
							onEdit={onEditUser}
							onCancel={cancel}
							onDelete={handleDelete}
						/>
					))
				}
			</S.ManageUsersContent>
			<S.ManageUsersActions>
				<S.ManageUsersActionsCancel onClick={handleCancel}>Cancelar</S.ManageUsersActionsCancel>
				<S.ManageUsersActionsSave onClick={handleSave}>Salvar Mudanças</S.ManageUsersActionsSave>
			</S.ManageUsersActions>
		</S.ManageUsers>
	);
};

export default ManageUsers;
