var React = require('react');

var Layout = React.createClass({
	render(){
        return (
            <div style={{width:'100%'}}> 
                <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Projectmanagement</a>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Layout;