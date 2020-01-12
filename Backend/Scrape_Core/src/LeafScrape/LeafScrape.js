import loginToLinkinedin from "../Activation_Functions/loginFunc.js"
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";

const BaseSeed = [
    "",
    "",
    "",
]

let LeafStack = []

async function LeafScrape() {
    const page = await loginToLinkinedin("https://www.linkedin.com/login");
    
}



LeafScrape()