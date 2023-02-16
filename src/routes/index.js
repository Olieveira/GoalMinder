import { NavigationContainer } from "@react-navigation/native";
import { UserRoutes } from "./routes";

export function Routes() {
    return (
        <NavigationContainer>
            <UserRoutes />
        </NavigationContainer>
    );
};