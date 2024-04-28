import {Badge, Box, Card, Flex, Heading, Link, Text} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import {truncate} from "../../utils/tools.ts";

interface IPublicationCard {
    publication: IPublication,
}

const PublicationCard = ({publication}: IPublicationCard) => {
    const navigate = useNavigate();

    return (
        <Card>
            <Flex direction={"column"} gap={'2'} height={'100%'}>
                <Heading size={"4"} as={'h4'}>{publication.topic}</Heading>
                <Text as={'p'}>{truncate(publication.resume, 160)}</Text>

                <Flex gap={"1"} direction={'row'} className={'keywords'} align={'stretch'} wrap={'wrap'}>
                    {publication.keywords.map((k: IKeyword) => <Badge key={k.id}>{k.keyword}</Badge>)}
                </Flex>

                <Box mt={"auto"}>
                    <Link onClick={() => navigate(`/publications/${publication.id}`)}>Перейти к работе</Link>
                </Box>
            </Flex>
        </Card>
    )
}

export default PublicationCard;