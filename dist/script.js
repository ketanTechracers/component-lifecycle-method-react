class Editor extends React.Component {
  componentWillMount() {
    //check if ckEditor is loaded
    if (CKEDITOR) {
      console.log('Loaded ck editor');
    }
  }

  componentDidMount() {
    //once mounted, find the textarea with id 'editor' and convert it into CKEditor
    var ckEditor = CKEDITOR.replace('editor');
    ckEditor.on('change', event => {
      var newData = event.editor.getData();
      if (newData.length)
      this.props.changeAction(newData);
    });
  }

  componentWillReceiveProps(nextProps) {
    //if passed prop 'text' changes to empty, reset the editor
    if (nextProps.text === '')
    CKEDITOR.instances.editor.setData('');
  }

  componentWillUnmount() {
    //destroy ckeditor instance before unmounting textarea
    CKEDITOR.instances.editor.destroy();
  }

  render() {
    return React.createElement("textarea", { id: "editor" });
  }}


//defining the required type of props for editor component
Editor.propTypes = {
  changeAction: React.PropTypes.func,
  bio: React.PropTypes.string };


//Parent component
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 100,
      bio: this.props.bio,
      showEditor: false };

    this.setBio = this.setBio.bind(this);
    this.resetBio = this.resetBio.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
  }

  toggleEditor(show) {
    this.setState({ showEditor: show });
  }

  setBio(newBio) {
    this.setState({ bio: newBio });
  }

  resetBio() {
    this.setState({ bio: '' });
  }

  render() {
    var { name, age, pic } = this.props;
    var { height, bio } = this.state;

    return (
      React.createElement("div", { className: "panel panel-primary profile text-center" },
      React.createElement("div", { className: "panel-heading" }, "My Profile"),
      React.createElement("div", { className: "panel-body" },
      React.createElement("div", { className: "pull-right badge", onClick: this.toggleEditor.bind(this, true) },
      React.createElement("span", { className: "glyphicon glyphicon-pencil", "aria-hidden": "true" }), " Edit"),

      this.state.showEditor ?
      React.createElement("div", null,
      React.createElement("div", { className: "pull-right badge", onClick: this.toggleEditor.bind(this, false) },
      React.createElement("span", { className: "glyphicon glyphicon-floppy-disk", "aria-hidden": "true" }), " Save"),

      React.createElement("div", { className: "pull-right badge", onClick: this.resetBio },
      React.createElement("span", { className: "glyphicon glyphicon-refresh", "aria-hidden": "true" }), " Reset")) :


      null,

      React.createElement("h2", null, name),
      React.createElement("h4", null, "Age: ", age),
      React.createElement("h4", { ref: "bio" }, "Bio: ", bio),
      this.state.showEditor ? React.createElement(Editor, { changeAction: this.setBio, text: bio }) : null)));



  }}


React.render(React.createElement(Profile, { name: "Ketan Saxena", age: 24, bio: "JS enthusiast with blurred history in Java.", pic: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/081/086/2f5c4dc.jpg" }), document.getElementById('app'));