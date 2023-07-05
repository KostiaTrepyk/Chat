import "./styles/loadingWindow.sass";

interface LoadingWindowProps {
    theme?: string;
}

function LoadingWindow(props: LoadingWindowProps): JSX.Element {
    return (
        <div id={props.theme} className="LoadingWindow_container">
            <h1 className="LoadingWindow">Loading...</h1>
        </div>
    );
}

export default LoadingWindow;
