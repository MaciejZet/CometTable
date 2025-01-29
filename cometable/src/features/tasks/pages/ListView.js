// src/features/tasks/pages/ListView.js
import React, { useState, useCallback, useEffect } from 'react';
import { useTasks } from '../store/TaskContext';
import { Table, Select, Input, DatePicker, Tag, Typography, Tooltip, Space, Popover, Button, Modal, Form, Dropdown, Menu, Badge, message, Upload, Card, Drawer } from 'antd';
import { CalendarOutlined, ExclamationCircleFilled, TagsOutlined, PlusOutlined, SettingOutlined, SearchOutlined, FilterOutlined, SaveOutlined, UploadOutlined, FolderOutlined, FileOutlined, FilePdfOutlined, FileImageOutlined, FileWordOutlined, FileExcelOutlined, EyeOutlined, EyeInvisibleOutlined, BookOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import debounce from 'lodash/debounce';
import './styles/ListView.css';

const ListView = () => {
  const { tasks, updateTask, updateTaskStatus, createNewTask, loading, groupBy, setGroupBy } = useTasks();
  const [newLabel, setNewLabel] = useState('');
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isColumnSettingsVisible, setIsColumnSettingsVisible] = useState(false);
  const [customColumns, setCustomColumns] = useState([]);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  

  const statusOptions = [
    { value: 'todo', label: 'Do zrobienia' },
    { value: 'inProgress', label: 'W trakcie' },
    { value: 'done', label: 'Zrobione' }
  ];

  const statusColors = {
    todo: '#ff9800',
    inProgress: '#2196f3',
    done: '#4caf50'
  };

  const priorityOptions = [
    { value: 'HIGH', label: 'Wysoki', color: '#ff4d4f' },
    { value: 'MEDIUM', label: 'Średni', color: '#faad14' },
    { value: 'LOW', label: 'Niski', color: '#52c41a' }
  ];

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleFieldChange = async (taskId, field, value) => {
    try {
      await updateTask(taskId, { [field]: value });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddLabel = async (taskId, label) => {
    const task = tasks.find(t => t._id === taskId);
    const newLabels = [...(task.labels || []), label];
    await updateTask(taskId, { labels: newLabels });
    setNewLabel('');
  };

  const handleRemoveLabel = async (taskId, labelToRemove) => {
    const task = tasks.find(t => t._id === taskId);
    const newLabels = (task.labels || []).filter(label => label !== labelToRemove);
    await updateTask(taskId, { labels: newLabels });
  };

  const handleCreateTask = async (values) => {
    await createNewTask(values);
    setIsNewTaskModalVisible(false);
    form.resetFields();
  };

  const handleSearch = debounce((value) => {
    setSearchText(value);
  }, 300);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setSearchText('');
  };

  const clearSorters = () => {
    setSortedInfo({});
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Szukaj ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
          >
            Szukaj
          </Button>
          <Button onClick={() => clearFilters()} size="small">
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''
  });

  const defaultColumns = [
    {
      title: 'Tytuł',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      filteredValue: filteredInfo.title || null,
      render: (text, record) => (
        <div className="title-cell">
          <Input
            defaultValue={text}
            onBlur={(e) => handleFieldChange(record._id, 'title', e.target.value)}
            onPressEnter={(e) => handleFieldChange(record._id, 'title', e.target.value)}
            className="editable-cell title-input"
            prefix={record.priority === 'HIGH' && 
              <Tooltip title="Wysoki priorytet">
                <ExclamationCircleFilled style={{ color: '#ff4d4f' }} />
              </Tooltip>
            }
          />
        </div>
      )
    },
    {
      title: 'Priorytet',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      filters: [
        { text: 'Wysoki', value: 'HIGH' },
        { text: 'Średni', value: 'MEDIUM' },
        { text: 'Niski', value: 'LOW' },
      ],
      filteredValue: filteredInfo.priority || null,
      onFilter: (value, record) => record.priority === value,
      render: (priority, record) => (
        <Select
          value={priority}
          onChange={(value) => handleFieldChange(record._id, 'priority', value)}
          options={priorityOptions}
          className="priority-select"
        >
          {priorityOptions.map(option => (
            <Select.Option key={option.value} value={option.value}>
              <Tag color={option.color}>{option.label}</Tag>
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: 'Etykiety',
      dataIndex: 'labels',
      key: 'labels',
      width: 200,
      filteredValue: filteredInfo.labels || null,
      render: (labels = [], record) => (
        <Space wrap className="labels-cell">
          {labels.map(label => (
            <Tag
              key={label}
              closable
              onClose={() => handleRemoveLabel(record._id, label)}
            >
              {label}
            </Tag>
          ))}
          <Popover
            content={
              <Space>
                <Input
                  placeholder="Nowa etykieta"
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  onPressEnter={() => handleAddLabel(record._id, newLabel)}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddLabel(record._id, newLabel)}
                />
              </Space>
            }
            trigger="click"
          >
            <Tag className="new-label-tag">
              <TagsOutlined /> Dodaj
            </Tag>
          </Popover>
        </Space>
      )
    },
    {
      title: 'Opis',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <Input.TextArea
          defaultValue={text}
          autoSize
          onBlur={(e) => handleFieldChange(record._id, 'description', e.target.value)}
          className="editable-cell description-input"
          placeholder="Dodaj opis..."
        />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      filters: [
        { text: 'Do zrobienia', value: 'todo' },
        { text: 'W trakcie', value: 'inProgress' },
        { text: 'Zrobione', value: 'done' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record._id, value)}
          options={statusOptions}
          className="status-select"
          style={{ backgroundColor: statusColors[status] + '20' }}
        >
          {statusOptions.map(option => (
            <Select.Option key={option.value} value={option.value}>
              <Tag color={statusColors[option.value]} className="status-tag">
                {option.label}
              </Tag>
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: 'Termin',
      dataIndex: 'dueDate',
      key: 'dueDate',
      filteredValue: filteredInfo.dueDate || null,
      width: 150,
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      sortOrder: sortedInfo.columnKey === 'dueDate' && sortedInfo.order,
      render: (date, record) => (
        <div className="date-cell">
          <CalendarOutlined className="calendar-icon" />
          <DatePicker
            defaultValue={date ? moment(date) : null}
            onChange={(date) => handleFieldChange(record._id, 'dueDate', date?.toDate())}
            className="date-picker"
            format="DD/MM/YYYY"
            placeholder="Wybierz datę"
          />
        </div>
      )
    }
  ];

  const additionalColumns = [
    {
      title: 'Kategorie',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories = [], record) => (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Dodaj kategorie"
          value={categories}
          onChange={(values) => handleFieldChange(record._id, 'categories', values)}
        />
      )
    },
    {
      title: 'Załączniki',
      key: 'attachments',
      render: (_, record) => (
        <Space>
          <Upload
            customRequest={handleUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Dodaj</Button>
          </Upload>
          {record.attachments?.length > 0 && (
            <Badge count={record.attachments.length}>
              <Button 
                icon={<FolderOutlined />}
                onClick={() => setSelectedTask(record)}
              />
            </Badge>
          )}
        </Space>
      )
    }
  ];

  const allColumns = [...defaultColumns, ...customColumns.map(col => ({
    title: col.title,
    dataIndex: col.key,
    key: col.key,
    render: (text, record) => (
      <Input
        defaultValue={text}
        onBlur={(e) => handleFieldChange(record._id, col.key, e.target.value)}
        className="editable-cell"
      />
    )
  })), ...additionalColumns];

  const [visibleColumns, setVisibleColumns] = useState(() => {
    const defaultColumnKeys = defaultColumns.map(col => col.key);
    const additionalColumnKeys = additionalColumns.map(col => col.key);
    return [...defaultColumnKeys, ...additionalColumnKeys];
  });

  useEffect(() => {
    const savedState = localStorage.getItem('listViewState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setVisibleColumns(state.visibleColumns || []);
      setFilteredInfo(state.filteredInfo || {});
      setSortedInfo(state.sortedInfo || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listViewState', JSON.stringify({
      visibleColumns,
      filteredInfo,
      sortedInfo
    }));
  }, [visibleColumns, filteredInfo, sortedInfo]);

  const handleAddColumn = (columnData) => {
    setCustomColumns([...customColumns, columnData]);
  };

  const handleBulkAction = async (action) => {
    switch (action) {
      case 'delete':
        // Usuwanie wielu zadań
        break;
      case 'status':
        // Zmiana statusu dla wielu zadań
        break;
      case 'priority':
        // Zmiana priorytetu dla wielu zadań
        break;
    }
    setSelectedRowKeys([]);
    message.success('Zaktualizowano wybrane zadania');
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Wyślij do API
      onSuccess();
    } catch (error) {
      onError();
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const FileTypeIcon = ({ type }) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
      case 'image':
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <FileImageOutlined style={{ color: '#52c41a' }} />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined style={{ color: '#1890ff' }} />;
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined style={{ color: '#52c41a' }} />;
      default:
        return <FileOutlined />;
    }
  };

  const bulkActionMenuItems = [
    {
      key: 'status',
      label: 'Zmień status',
      children: statusOptions.map(status => ({
        key: 'status-' + status.value,
        label: status.label,
        onClick: () => handleBulkAction('status'),
      })),
    },
    {
      key: 'priority',
      label: 'Zmień priorytet',
      children: priorityOptions.map(priority => ({
        key: 'priority-' + priority.value,
        label: priority.label,
        onClick: () => handleBulkAction('priority'),
      })),
    },
    { type: 'divider' },
    {
      key: 'delete',
      label: 'Usuń wybrane',
      danger: true,
      onClick: () => handleBulkAction('delete'),
    },
  ];

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const columnVisibilityMenuItems = [
    {
      type: 'group',
      label: 'Widoczne kolumny',
      children: allColumns
        .filter(col => visibleColumns.includes(col.key))
        .map(column => ({
          key: 'visible-' + column.key,
          label: column.title,
          icon: <EyeOutlined className="visible-column-icon" />,
          onClick: () => toggleColumnVisibility(column.key),
        })),
    },
    { type: 'divider' },
    {
      type: 'group',
      label: 'Ukryte kolumny',
      children: allColumns
        .filter(col => !visibleColumns.includes(col.key))
        .map(column => ({
          key: 'hidden-' + column.key,
          label: column.title,
          icon: <EyeInvisibleOutlined className="hidden-column-icon" />,
          onClick: () => toggleColumnVisibility(column.key),
        })),
    },
  ];

  const visibleTableColumns = visibleColumns.length > 0 
    ? allColumns.filter(col => visibleColumns.includes(col.key))
    : allColumns;

  const groupingOptions = [
    { label: 'None', value: 'none' },
    { label: 'Status', value: 'status' },
    { label: 'Project', value: 'project' },
    // Add more grouping options as needed
  ];

  const groupedTasks = React.useMemo(() => {
    if (groupBy === 'none') return { All: tasks };
    return tasks.reduce((groups, task) => {
      const key = task[groupBy] || 'Others';
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
      return groups;
    }, {});
  }, [tasks, groupBy]);

  return (
    <div className="list-view modern">
      <div className="list-header">
        <Typography.Title level={2} className="page-title">Lista Zadań</Typography.Title>
        <Space wrap>
          <Input
            placeholder="Szukaj we wszystkich kolumnach"
            onChange={e => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button onClick={clearFilters}>Wyczyść filtry</Button>
          <Button onClick={clearSorters}>Wyczyść sortowanie</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsNewTaskModalVisible(true)}
          >
            Nowe zadanie
          </Button>
          <Button
            icon={<SettingOutlined />}
            onClick={() => setIsColumnSettingsVisible(true)}
          >
            Kolumny
          </Button>
          <Dropdown menu={{ items: columnVisibilityMenuItems }}>
            <Button icon={<EyeOutlined />}>
              Widoczne kolumny
            </Button>
          </Dropdown>
          {selectedRowKeys.length > 0 && (
            <Dropdown menu={{ items: bulkActionMenuItems }}>
              <Button>
                Akcje grupowe ({selectedRowKeys.length})
              </Button>
            </Dropdown>
          )}
          <Select
            value={groupBy}
            onChange={value => setGroupBy(value)}
            options={groupingOptions}
            style={{ width: 200 }}
            placeholder="Group By"
          />
        </Space>
      </div>

      {Object.entries(groupedTasks).map(([group, groupTasks]) => (
        <div key={group} className="task-group">
          <Typography.Title level={4}>{group}</Typography.Title>
          <Table
            dataSource={groupTasks.filter(task => 
              !searchText || 
              Object.values(task).some(val => 
                val && val.toString().toLowerCase().includes(searchText.toLowerCase())
              )
            )}
            columns={visibleTableColumns}
            rowKey="_id"
            loading={loading}
            pagination={false}
            className="modern-table"
            rowClassName="table-row"
            onChange={handleChange}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            expandable={{
              expandedRowRender: record => (
                <div className="task-details">
                  <div className="task-activity">
                    <h4>Historia aktywności</h4>
                    {/* Tu można dodać historię zmian */}
                  </div>
                  <div className="task-attachments">
                    <h4>Załączniki</h4>
                    {/* Tu można dodać obsługę załączników */}
                  </div>
                </div>
              ),
            }}
          />
        </div>
      ))}

      {/* Modal for new task */}
      <Modal
        title="Nowe zadanie"
        open={isNewTaskModalVisible}
        onCancel={() => setIsNewTaskModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateTask} layout="vertical">
          <Form.Item name="title" label="Tytuł" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Opis">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="priority" label="Priorytet" initialValue="MEDIUM">
            <Select options={priorityOptions} />
          </Form.Item>
          <Form.Item name="dueDate" label="Termin">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Dodaj zadanie
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for column settings */}
      <Modal
        title="Zarządzaj kolumnami"
        open={isColumnSettingsVisible}
        onCancel={() => setIsColumnSettingsVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddColumn} layout="vertical">
          <Form.Item name="title" label="Nazwa kolumny" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="key" label="Klucz" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Dodaj kolumnę
            </Button>
          </Form.Item>
        </Form>
        <div className="custom-columns-list">
          {customColumns.map(col => (
            <Tag
              key={col.key}
              closable
              onClose={() => setCustomColumns(cols => cols.filter(c => c.key !== col.key))}
            >
              {col.title}
            </Tag>
          ))}
        </div>
      </Modal>

      <Drawer
        title="Załączniki zadania"
        placement="right"
        onClose={() => setSelectedTask(null)}
        open={!!selectedTask}
      >
        {selectedTask?.attachments?.map(attachment => (
          <Card key={attachment.url} size="small" className="attachment-card">
            <Space>
              <FileTypeIcon type={attachment.type} />
              <div>
                <div>{attachment.name}</div>
                <small>{formatFileSize(attachment.size)}</small>
              </div>
            </Space>
          </Card>
        ))}
      </Drawer>
    </div>
  );
};

export default ListView;