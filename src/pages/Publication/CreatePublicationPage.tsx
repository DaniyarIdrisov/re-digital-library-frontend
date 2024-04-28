import {Box, Container, Flex, Heading, Section, Separator, Text} from "@radix-ui/themes";
import React, {useState} from "react";
import UploadFileForm from "../../components/Publications/CreateForm/UploadFileForm.tsx";
import CreatePublication from "../../components/Publications/CreateForm/CreatePublication.tsx";
import GenerateKeyWords from "../../components/Publications/CreateForm/GenerateKeyWords.tsx";

const WelcomeTextBlock: React.FC = () => {
    return (
        <Box>
            <Text>
                После внесения всей необходимой информации для добавления публикации происходит ее модерация. Процесс
                добавления публикации разделен на три логических этапа.

                <ol>
                    <li>Загрузка текстового файла публикации с ее содержанием</li>
                    <li>Оформление публикации - указание автора, ссылки на ресурсы или работы использованные в Вашей
                        публикации, а также тема и аннотации к публикации
                    </li>
                    <li>Генерация ключевых слов, а также их добавление или редактирование</li>
                </ol>
            </Text>
        </Box>
    );
}

export interface ICreatePublicationForm {
    filename?: string
    publicationId?: string
}

const CreatePublicationPage: React.FC = () => {
    const [form, setForm] = useState<ICreatePublicationForm>({})
    const [currentStepCounter, setCurrentStepCounter] = useState<number>(1);

    const next = () => setCurrentStepCounter((prevStepCounter) => prevStepCounter < TOTAL_STEPS ? prevStepCounter + 1 : TOTAL_STEPS);

    const STEP_COMPONENTS = [
        {
            title: "Добавление новой публикации",
            element: <WelcomeTextBlock/>
        },
        {
            title: '1. Загрузка файла публикации',
            element: <UploadFileForm setForm={setForm} next={next}/>,
        },
        {
            title: '2. Оформление публикации',
            element: <CreatePublication form={form} setForm={setForm} next={next}/>
        },
        {
            title: '3. Генерация ключевых слов публикации',
            element: <GenerateKeyWords form={form}/>
        },
    ]

    const TOTAL_STEPS: number = STEP_COMPONENTS.length;

    const goToStep = (index: number) => setCurrentStepCounter(index);

    return (
        <Section>
            <Container>
                <Box>
                    <Flex direction={'column'}>
                        {
                            STEP_COMPONENTS.map((item, index) => {
                                return (
                                    <Box key={`step_${index}`}>
                                        <Flex direction={'column'} gap={'3'}>
                                            <Heading style={{
                                                cursor: 'pointer'
                                            }} as={'h2'}
                                                     onClick={goToStep.bind(this, index + 1)}>{item.title}</Heading>
                                            <Box style={currentStepCounter === index + 1 || {
                                                display: 'none'
                                            }}>{item.element}</Box>
                                        </Flex>

                                        <Separator my={'3'} size={'4'}/>
                                    </Box>
                                )
                            })
                        }
                    </Flex>

                    {/*<Flex gap={'2'} align={"center"} justify={'center'}>*/}
                    {/*    <Button disabled={hasPreviousStep} size={'3'} onClick={prev}>Вернутся назад</Button>*/}
                    {/*    <Button disabled={hasNextStep} size={'3'} onClick={next}>Следующий шаг</Button>*/}
                    {/*</Flex>*/}
                </Box>
            </Container>
        </Section>
    )
}

export default CreatePublicationPage;