import { ReactNode, useEffect, useMemo, useState } from "react"
import { getIndianCuisineList } from "../../api/indianCuisine";
import { Table } from "../../components/commonTable";
import { ColumnDef } from '@tanstack/react-table';
import SkillAutosuggest from "../../components/AutoSuggester";
import DishSuggester from "../../components/DishSuggester";
import './CuisineListing.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

export const CuisineListing = () => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [filteredData,setFilteredData] = useState<any>([]);
    
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const jsonData = await getIndianCuisineList();
            setData(jsonData);
            setFilteredData(jsonData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    type Item = {
        name: string;
        price: number;
        quantity: number;
    }
    const columns = useMemo<ColumnDef<Item>[]>(
        () => [
            {
                header: 'Name',
                cell: (row) => {
                    return (
                        <button
                            onClick={() => {
                                navigate(`/dish/${row.getValue()}`, { state: { data } });
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'blue', 
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                padding: '0',
                                font: 'inherit',
                                textAlign: 'left',
                              }}
                        >
                            {row.getValue() as ReactNode}
                        </button>
                    );
                },

                accessorKey: 'name',
            },
            {
                header: 'cook time',
                cell: (row) => row.renderValue(),
                accessorKey: 'cook_time',
            },
            {
                header: 'course',
                cell: (row) => row.renderValue(),
                accessorKey: 'course',
            },
            {
                header: 'diet',
                cell: (row) => row.renderValue(),
                accessorKey: 'diet',
            },
            {
                header: 'flavor profile',
                cell: (row) => row.renderValue(),
                accessorKey: 'flavor_profile',
            },
            {
                header: 'ingredients',
                cell: (row) => row.renderValue(),
                accessorKey: 'ingredients',
            },
            {
                header: 'prep time',
                cell: (row) => row.renderValue(),
                accessorKey: 'prep_time',
            },
            {
                header: 'region',
                cell: (row) => row.renderValue(),
                accessorKey: 'region',
            },
            {
                header: 'state',
                cell: (row) => row.renderValue(),
                accessorKey: 'state',
            },
        ],
        [data]
    );

    useEffect(() => {
        fetchData();
    }, [])

    const allIngredients: Array<string> = Array.from(new Set(data.flatMap((dish: { ingredients: any; }) => dish.ingredients)));

    console.log(allIngredients);
    const handleSkillSelected = (skill: any) => {
        if (!selectedIngredients.includes(skill)) {
            setSelectedIngredients([...selectedIngredients, skill]);
        }
    };
    const removeItem = (skill: string) => {
        setSelectedIngredients(selectedIngredients.filter(function (item: string) {
            return item !== skill
        }))
    }
    console.log(filteredData,'filtered data')
    return (
        <>
         <Header data={data} setFilteredData={setFilteredData} />
            <div style={{ border: '1px solid gray', marginTop:'32px' }}>
                <h2 style={{ margin: '20px' }}>Dish Suggester</h2>
                <SkillAutosuggest skills={allIngredients} onSkillSelected={handleSkillSelected} />
                <div style={{ margin: '20px' }}>
                    {selectedIngredients.map((skill: any, index: any) => (
                        <div key={index} className="selected-ingredient">{skill}<button className="close-icon" onClick={() => { removeItem(skill) }}> &#10006;</button></div>
                    ))}
                </div>
                <DishSuggester allDishes={data} selectedIngredients={selectedIngredients} />
            </div>
           
            <Table data={filteredData} columns={columns} showFooter={true} showNavigation={true} />

        </>
    )
}