import { Spinner, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ArticleScreenHeader from '../components/ArticleScreenHeader';
import ContentCard from '../components/ContentCard';
import DropdownMenu from '../components/DropdownMenu';
import ErrorMessage from '../components/ErrorMessage';
import TextSpanner from '../components/TextSpanner';
import client from '../sanity/client';
import {
  QUERY_ARTICLE,
  QUERY_ARTICLES,

  QUERY_ARTICLES_BY_CATEGORY, QUERY_CATEGORIES,
} from '../sanity/educateArticle';
import { colours, theme } from '../theme/theme';

const EducateArticles = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [educateArticles, setEducateArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Query the articles from Sanity
  useEffect(() => {
    if (selectedCategory === 'all') {
      client.fetch(QUERY_ARTICLES())
        .then(res => {
          setLoading(false);
          setEducateArticles(res);
        })
        .catch(e => {
          setError(e);
        });
    } else {
      client.fetch(QUERY_ARTICLES_BY_CATEGORY(selectedCategory))
        .then(res => {
          setLoading(false);
          setEducateArticles(res);
        })
        .catch(e => {
          setError(e);
        });
    }

    client.fetch(QUERY_CATEGORIES)
      .then(res => {
        setLoading(false);
        setCategories([
          { _id: 'all', name: 'All' },
          ...res,
        ]);
      })
      .catch(e => {
        setError(e);
      });
  }, [selectedCategory]);

  return (
    <>
      {/* Header */}
      <ArticleScreenHeader text="Content curated by the LBC team!" />

      {/* Category Picker and Articles */}
      <View
        style={{
          alignItems: 'center', justifyContent: 'center', flex: 1,
        }}
      >
        {loading && (
          <Spinner color={colours.purple} />
        )}
        {error && (
          <ErrorMessage error={error} />
        )}

        {!loading && !error && (
          <>
            {/* Category Picker */}
            <DropdownMenu
              text="Category"
              placeholder="Select a Category"
              items={categories}
              selectedItem={selectedCategory}
              onValueChange={v => {
                return setSelectedCategory(v);
              }}
            />
            {/* Articles */}
            {educateArticles.length > 0 ? (
              <FlatList
                style={theme.sanityCardList}
                data={educateArticles}
                renderItem={({ item }) => {
                  return (
                    // Article Cards
                    <ContentCard
                      navigateTo="Article"
                      content={item}
                      queryContent={QUERY_ARTICLE}
                    />
                  );
                }}
                keyExtractor={item => { return item._id; }}
              />
            ) : (
              <TextSpanner text="Unfortunately there is nothing here yet... Check back soon!" />
            )}
          </>
        )}
      </View>
    </>
  );
};

export default EducateArticles;
