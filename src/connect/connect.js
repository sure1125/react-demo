import { PureComponent } from "react";



export default function connect(mapStateToProps,mapDispatchToProps){
    return function(WrapperConponent) {
        class newComponent extends PureComponent {
            render() {
                return <WrapperConponent {...this.props} />
            }
        }
        return newComponent

    }
}