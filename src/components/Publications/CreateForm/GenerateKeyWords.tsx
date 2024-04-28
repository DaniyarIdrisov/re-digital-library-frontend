import {Button, Flex} from "@radix-ui/themes";
import {api} from "../../../configs/api.ts";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import {ICreatePublicationForm} from "../../../pages/Publication/CreatePublicationPage.tsx";
import PublicationService from "../../../services/PublicationService.ts";

interface IGenerateKeyWords {
    form: ICreatePublicationForm,
}

const GenerateKeyWords: React.FC<IGenerateKeyWords> = ({form}) => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState<string>('');

    const [selected, setSelected] = useState([]);

    const onChangeSelect = (value: string) => {
        setInputValue(value);

        if (value.includes(',') && value.length > 1) {
            setSelected((prevState) => [...prevState, {
                label: value.split(',')[0],
                value: value.split(',')[0],
                isGenerated: false
            }])

            setInputValue('');
        }
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();

        const data = selected.map((item) => {
            if (item.isGenerated) {
                return {
                    keywordId: item.value
                }
            }

            return {
                keywordName: item.value
            }
        })

        api.post(`api/v1/publication/${form.publicationId}/setKeywords`, data).then(r => {
            if (r.status === 200) {
                navigate(`/publications/${form.publicationId}`)

                return;
            }
        });
    }


    useEffect(() => {
        if (form?.publicationId) {
            PublicationService
                .generateKeywordsByPublicationId(form.publicationId)
                .then(r => {
                    setSelected(r.data.map((item: IKeyword) => ({
                        label: item.keyword,
                        value: item.id,
                        isGenerated: true,
                    })))
                })
        }
    }, [form])

    return (
        <form onSubmit={onSubmitHandle}>
            <Flex direction={'column'} gap={'2'}>

                <Select
                    options={selected}
                    onInputChange={onChangeSelect}
                    isMulti={true}
                    value={selected}
                    inputValue={inputValue}
                />

                <Button type={'submit'}>Создать публикацию</Button>
            </Flex>
        </form>
    )
}

export default GenerateKeyWords;