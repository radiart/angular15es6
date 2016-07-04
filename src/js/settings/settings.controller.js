class SettingsCtrl {

	constructor( User ){
		'ngInject';

		this.formData = {
			   email: User.current.email,
			     bio: User.current.bio,
			   image: User.current.image,
			username: User.current.username,
		}

		this.logout = User.logout.bind( User );
	}
}

export default SettingsCtrl;