import { HTMLAttributes, useEffect, useState } from 'react';
import { ReactComponent as Add } from 'assets/icons/add.svg';
import * as S from './style';
import EditTable from 'components/EditTable';
import { QueryKey } from 'types/QueryKey';
import { TableService } from 'services/TableService';
import { useMutation, useQuery } from 'react-query';
import { Table, TableResponse } from 'types/api/table';
import { ErrorResponse } from 'types/api/error';

type ManageTablesType = HTMLAttributes<HTMLDivElement>;

type ManageTablesProps = {} & ManageTablesType;

const ManageTables = ({ ...props }: ManageTablesProps) => {
	const [tables, setTables] = useState<TableResponse[]>([]);

	const add = useMutation(TableService.create, {
    onSuccess: (data: TableResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const tableList = [...tables, data as TableResponse];
      setTables(tableList);
    },
    onError: () => {
      console.error("Erro ao adicionar a mesa");
    },
  });

  const update = useMutation(TableService.updateById, {
    onSuccess: (data: TableResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const editedTables = tables.map((i) =>
        data.id === i.id ? (data as TableResponse) : i
      );
      setTables(editedTables);
    },
    onError: () => {
      console.error("Erro ao atualizar a mesa");
    },
  });

  const remove = useMutation(TableService.deleteById, {
    onSuccess: (data: TableResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const editedTables = tables.filter((i) => data.id !== i.id);
      setTables(editedTables);
    },
    onError: () => {
      console.error("Erro ao remover a mesa");
    },
  });

	const [cancel, setCancel] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  let tableToAdd: Table | null = null;
  let tablesToEdit: TableResponse[] = [];

	const handleCancel = () => {
    setCancel(true);
    setIsAdding(false);
    setTimeout(() => setCancel(false));
    tablesToEdit = [];
  };

  const handleSave = () => {
    tablesToEdit.forEach((table) => update.mutate(table));
    if (tableToAdd) add.mutate(tableToAdd);
    setTimeout(() => handleCancel(), 300);
    tableToAdd = null;
    setIsAdding(false);
  };

  const handleDelete = (table: TableResponse) => {
    remove.mutate(table.id);
  };

  const onAddChange = (number: string) => {
    tableToAdd = { number: Number(number) };
  };

  const onEditTable = (toEdit: TableResponse) => {
    setCancel(false);
    const existing = tablesToEdit.find((table) => table.id === toEdit.id);

    tablesToEdit = existing
      ? tablesToEdit.map((i) => (i.id === existing.id ? toEdit : i))
      : [...tablesToEdit, toEdit];
  };

	const {data: tablesData} = useQuery(
		[QueryKey.TABLES], 
		TableService.getLista
	);

	useEffect(() => {
    setTables(tablesData || []);
  }, [tablesData]);

	return (
		<S.ManageTables {...props}>
			<S.ManageTablesTitle>Gerenciar Mesas</S.ManageTablesTitle>
			<S.ManageTablesSub>
				<b>Mesas</b>
			</S.ManageTablesSub>
			<S.ManageTablesContent>
				{!isAdding ? (
				<S.ManageTablesContentAdd onClick={() => setIsAdding(true)}>
					<Add />
					<span>Adicionar mesa</span>
				</S.ManageTablesContentAdd>
				): (
				<S.ManageTablesContentAdd>
					<label htmlFor="tableId">Número da Mesa</label>
					<S.EditForm 
						id="tableId" 
						type="number" 
						placeholder="01" 
						onChange={({target}) => onAddChange(target.value)}/>
				</S.ManageTablesContentAdd>
				)};
				{tables.map((table, index) => (
					<EditTable 
						table={table}
						key={index}
						onCancel={cancel}
						onDelete={handleDelete}
						onEdit={onEditTable}
					/>
				))}
				
			</S.ManageTablesContent>
			<S.ManageTablesActions>
				<S.ManageTablesActionsCancel onClick={handleCancel}>Cancelar</S.ManageTablesActionsCancel>
				<S.ManageTablesActionsSave onClick={handleSave}>Salvar Mudanças</S.ManageTablesActionsSave>
			</S.ManageTablesActions>
		</S.ManageTables>
	);
};

export default ManageTables;
