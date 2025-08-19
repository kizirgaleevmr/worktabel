import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";

export function DefaultSidebar() {
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 text-2xl">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Меню
                </Typography>
            </div>
            <List>
                <ListItem className="mb-3">
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5 mr-4" />
                    </ListItemPrefix>
                    Табыль времени
                </ListItem>
                <ListItem className="mb-3">
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5 mr-4" />
                    </ListItemPrefix>
                    Сотрудники
                </ListItem>
                <ListItem className="mb-3">
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5 mr-4" />
                    </ListItemPrefix>
                    Заявки
                    <ListItemSuffix>
                        <Chip
                            value="14"
                            size="sm"
                            variant="ghost"
                            color="blue-gray"
                            className="rounded-full"
                        />
                    </ListItemSuffix>
                </ListItem>
                <ListItem className="mb-3">
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5 mr-4" />
                    </ListItemPrefix>
                    Профиль
                </ListItem>
                <ListItem className="mb-3">
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5 mr-4" />
                    </ListItemPrefix>
                    Выйти
                </ListItem>
            </List>
        </Card>
    );
}
