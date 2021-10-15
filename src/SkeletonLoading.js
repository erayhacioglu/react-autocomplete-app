import './skeletonLoading.css';

const SkeletonLoading = () => {
	return (
		<div className='skeleton-box'>
			<div className='skeleton skeleton-img'></div>
			<div>
				<div className='skeleton skeleton-text'></div>
				<div className='skeleton skeleton-text'></div>
			</div>
		</div>
	);
};

export default SkeletonLoading;
