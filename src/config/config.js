import {dashboardData} from "./dashboard-data";
import {KillKane} from "./features/kill-kane";
import {KillKaneAction} from "./actions/Killkane";

/**
 * @type ConfigType
 */
export const config = {
    name: "Dishub",
    footer: [
        {
            name: {zh: "支持", en: "Support"},
            url: "https://github.com/SonMooSans"
        }
    ],
    settings: detail => [
        {
            id: "say",
            name: "Test",
            type: "string",
            value: detail["say"]
        }
    ],
    actions: {
        "kill_kane": KillKaneAction
    },
    features: {
        "auto_kill_kane": KillKane
    },
    serverUrl: "http://localhost:8080",
    inviteUrl: "https://discord.com/api/oauth2/authorize?client_id=1004280473956139038&permissions=8&scope=bot",
    data: {
        dashboard: dashboardData,
        /*
        features: data => [
            {
                name: "測試版功能",
                description: "在我們的不和諧服務器中投票，告訴我們您希望什麼功能",
                icon: BsPeopleFill,
                type: DataTypes.List,
                value: data.betaFeatures
            }
        ]
         */
    },
}