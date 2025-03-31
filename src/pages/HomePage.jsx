import packageJson from "../../package.json";

function HomePage(){
    return(
        <div style={{marginLeft: "12px"}}>
            Version: {packageJson.version}
        </div>
    )
}
export default HomePage;