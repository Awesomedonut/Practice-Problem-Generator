import React from 'react';
import styles from './page.module.css';
import Head from 'next/head';
import { Kaushan_Script } from 'next/font/google';

const kaushan = Kaushan_Script({
  weight: ['400', '400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const MyPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <style>{`
          @import url('${kaushan}');
        `}</style>
      </Head>

      <div className={styles.header}>Probloom</div>

      <div className={styles.mainContent}>
        <div className={styles.centeredBox}>
          <p>Lorem, isum dolor sit amet consectetur adipisicing elit. Ex aut officiis, voluptates ipsa laborum et maiores earum perspiciatis quae consequatur ducimus accusantium molestiae, vero excepturi fugit porro dicta facere repudiandae pariatur modi! Ullam sed ducimus, aliquam numquam tempore, nemo quam rem ipsum nisi doloremque totam modi non autem. Libero nulla alias tempore expedita fugiat, dignissimos excepturi itaque provident sequi. Laborum iusto in animi quia quidem, magnam dicta dolor perferendis dolore laboriosam, corporis fuga, ea quibusdam ipsa odit facilis eligendi. Quod doloremque voluptatum voluptatem? Tempora harum voluptas dicta nisi, eos sunt voluptatibus pariatur officiis culpa ea magnam aperiam sequi optio nesciunt, dolore libero voluptatem inventore laboriosam tempore id iste accusamus. Commodi sint voluptatem velit laboriosam repellat, in iusto ea quas vitae voluptatibus perspiciatis similique ipsam enim nam cupiditate deserunt praesentium nobis, quis vero tempora explicabo pariatur eligendi consequuntur necessitatibus? Expedita placeat sunt praesentium dignissimos doloribus laborum cupiditate asperiores? Aliquid quam distinctio eum unde eos enim aliquam inventore, doloribus dignissimos autem facilis quod magni nulla exercitationem. Harum deserunt cumque incidunt itaque quo beatae eligendi debitis et ex sed. Quos accusamus facilis sapiente consectetur! Optio officia itaque veniam quisquam corporis deleniti ut animi voluptatem, distinctio consectetur non aut eaque est fugiat voluptate expedita.</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
