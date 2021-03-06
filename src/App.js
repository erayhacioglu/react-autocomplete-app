import { useState, useEffect,useRef } from 'react';
import './App.css';
import axios from 'axios';
import SkeletonLoading from './SkeletonLoading';

const App = () => {
	const [textInput, setTextInput] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const searchRef = useRef();

	const isTyping = textInput.replace(/\s+/, '').length > 0;
	
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleClickOutside = (e) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setTextInput('');
		}
	};
	
	useEffect(() => {
		const getData = async () => {
			if (isTyping) {
				setLoading(true);
				const { data } = await axios.get(
					`https://api.tvmaze.com/search/shows?q=${textInput}`
				);
				setResults(data);
				setLoading(false);
			}
		};
		getData();
	}, [textInput, isTyping]);

	const clearSearch = () => {
		setTextInput('');
		setResults([]);
	};

	return (
		<div className='search-box' ref={searchRef}>
			<input
				className={`search-input ${isTyping && 'typing'}`}
				placeholder='enter the show'
				value={textInput}
				onChange={(e) => setTextInput(e.target.value)}
			/>
			{isTyping && (
				<div className='search-times' onClick={clearSearch}>
					x
				</div>
			)}
			{isTyping && (
				<ul className='search-result'>
					{loading &&
						[1, 2, 3, 4, 5].map((key) => <SkeletonLoading key={key} />)}
					{results.length > 0 &&
						loading === false &&
						results.map((result, key) => (
							<li className='search-result-item' key={key}>
								<img
									src={
										result.show.image !== null
											? result.show.image.original
											: 'https://fevzigandur.com/wp-content/themes/consultix/images/no-image-found-360x260.png'
									}
									alt=''
									className='result-item-photo'
									loading='lazy'
								/>
								<div>
									<h5 className='result-item-name'>{result.show.name}</h5>
									<p className='result-item-type'>{result.show.genres[0]}</p>
								</div>
							</li>
						))}
					{!results.length > 0 && (
						<div className='result-not-found'>
							No results found for "{textInput}"
						</div>
					)}
				</ul>
			)}
		</div>
	);
};

export default App;
