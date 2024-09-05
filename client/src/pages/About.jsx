import Logo from '../components/atoms/Logo';

const About = () => {

    return (
        <div className="flex items-center justify-center md:min-h-[90vh]">
            <div className="max-w-4xl p-6 bg-white rounded-lg mt-6 mx-3 lg:mx-0 lg:mt-0">
                <h1 className="text-3xl font-bold mb-4">
                    About Us
                </h1>
                <p className="text-lg mb-4">
                    Welcome to <span className='inline-flex mx-1'><Logo /></span> This app is designed to help you organize your thoughts, tasks, and ideas in a simple and effective way.
                </p>
                <p className="text-lg mb-4">
                    Our mission is to provide a clean, intuitive platform for managing your notes, whether for work, personal use, or study. You can easily add, edit, delete, and categorize your notes, and keep them organized with our user-friendly interface.
                </p>
                <p className="text-lg">
                    Thank you for using our Notes App, and we hope it helps you stay organized and productive!
                </p>
            </div>
        </div>
    );
};

export default About;
