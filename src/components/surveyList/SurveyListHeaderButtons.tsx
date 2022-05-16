import React from 'react';
import { Alert, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { useLocalizationContext } from '../../context/localizationContext';

import { logout } from '../../services/session';
import { syncLocalSurveys } from '../../services/sync';

import { APP_THEME, SYNC_STATUS_UNSYNCED } from '../../constants';
import { SurveyListItem } from '../../types/survey';

type SurveyListRightButtonProps = SyncButtonProps & SettingsButtonProps;

type SyncButtonProps = {
  isNetworkConnected: boolean;
  surveys: Array<SurveyListItem>;
  setShowsSpinner(showsSpinner: boolean): void;
  refreshSurveys(): void;
};

type SettingsButtonProps = {
  navigation: any;
};

export function SurveyListRightButtons(props: SurveyListRightButtonProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <SyncButton
        isNetworkConnected={props.isNetworkConnected}
        surveys={props.surveys}
        setShowsSpinner={props.setShowsSpinner}
        refreshSurveys={props.refreshSurveys}
      />
      <SettingsButton navigation={props.navigation} />
    </View>
  );
}

export function SyncButton(props: SyncButtonProps) {
  const { t } = useLocalizationContext();
  const localSurveys = props.surveys.filter(s => s._syncStatus === SYNC_STATUS_UNSYNCED);

  const isSyncActive = localSurveys.length > 0 && props.isNetworkConnected;

  const confirmSync = () => {
    Alert.alert(
      t('SYNCING'),
      t('UPLOAD_SURVEY_MESSAGE'),
      [
        {
          text: t('OK'),
          onPress: async () => {
            props.setShowsSpinner(true);
            await syncLocalSurveys(localSurveys);
            await props.refreshSurveys();
            props.setShowsSpinner(false);
          },
        },
        {
          text: t('CANCEL'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Icon
      iconStyle={{ padding: 10 }}
      name="sync"
      size={22}
      color={isSyncActive ? APP_THEME.APP_BASE_COLOR : APP_THEME.APP_DARK_FONT_COLOR}
      type="material"
      onPress={() => {
        isSyncActive && confirmSync();
      }}
    />
  );
}

export function LogoutButton(t, authContext) {
  return (
    <Icon
      iconStyle={{ padding: 10 }}
      name="logout"
      size={22}
      color={APP_THEME.APP_BASE_COLOR}
      type="simple-line-icon"
      onPress={() => {
        logout(t, authContext);
      }}
    />
  );
}

export function SettingsButton({ navigation }: SettingsButtonProps) {
  return (
    <Icon
      iconStyle={{ padding: 10 }}
      name="settings"
      size={22}
      color={APP_THEME.APP_BASE_COLOR}
      type="material"
      onPress={() => {
        navigation.navigate('Settings');
      }}
    />
  );
}
