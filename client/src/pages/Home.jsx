import image from '../assets/notes.svg'

const Home = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center md:min-h-[90vh]  p-4">
            <div className="flex-1 mr-4 mb-8 lg:ml-10 mt-10 md:mt-0">
                <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-4">
                    Organize Your Thoughts
                </h1>
                <p className="text-lg md:text-xl text-gray-600 text-center md:text-left">
                    Our notes app helps you keep track of your ideas and tasks with ease.
                    Whether for work, study, or personal use, stay organized and productive
                    with a modern interface and powerful features.
                </p>
            </div>
            <div className="flex-1 mt-10 md:mt-0">
                <img src={image} alt="Notes App" className="w-full h-auto max-w-md mx-auto" />
            </div>
        </div>
    )
}

export default Home